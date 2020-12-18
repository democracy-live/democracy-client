import * as Keychain from 'react-native-keychain';
import DeviceInfo from 'react-native-device-info';

export interface ChainEntry {
  procedureId: string;
  selection: 'YES' | 'NO' | 'ABSTINATION';
  time: Date;
  constituency: string | null;
}

export interface ChainEntryRaw {
  i: string;
  s: null | 1 | 2 | 3;
  t: string;
  c: string | null;
}

type ChainOldEntryValueRaw = null | 0 | 1 | 2 | 3;

export interface Chain {
  v: number;
  d: ChainEntryRaw[];
  i?: any;
}

export type SetLocalVote = Pick<
  ChainEntry,
  'procedureId' | 'selection' | 'constituency'
>;

class VotesLocal {
  /*
    Keychain structure
      // v0
      democracyVotes:
      {
        procedureId1: 0/1/2/3, (selection)
        procedureId2: 0/1/2/3,
      }

      // v1
      democracyIndex
      {
        v: 1,
        i: [0,1,2,...] (buckets: democracyVotes0, democracyVotes1, democracyVotes2, ...)
      }
      democracyVotesX:
      {
        [
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
          ...
        ]
      }

    Structure given from/to read/writeKeychain:
      // can also be an array of those structures
      {
        v: 1,
        d: [
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
          {i: procedureId, s: null/1/2/3, t: DateISOString, c: constituency}
        ]
      }

    Structure returned from this interface via getVote/getVotes(array):
    {
      procedureId: String,
      selection: null/YES/NO/ABSTINATION,
      time: Date,
      constituency: String,
    }
  */

  static KEYCHAIN_INDEX_SERVICE = `${DeviceInfo.getBundleId()}.localVotesIndex`;
  static KEYCHAIN_VOTES_SERVICE = `${DeviceInfo.getBundleId()}.localVotes`; // IndexId is appended
  static KEYCHAIN_VOTES_SERVICE_VERSION_0 = undefined; // this is the correct value ¯\_(ツ)_/¯
  static KEYCHAIN_VERSION = 1;
  static KEYCHAIN_MAXSIZE = 100;
  static KEYCHAIN_INDEX_KEY = 'democracyIndex';
  static KEYCHAIN_VOTES_KEY = 'democracyVotes';

  // Read a v1 Chain
  static readKeychain = async (): Promise<Chain> => {
    // Get Chain Index
    const keyindex = await Keychain.getGenericPassword({
      service: VotesLocal.KEYCHAIN_INDEX_SERVICE,
    });
    // Is Chain Present and valid?
    if (
      !keyindex ||
      !(await VotesLocal.validateKeychain(JSON.parse(keyindex.password)))
    ) {
      // Do we have an old Chain available? (not saved to Chain)
      const oldChain = await VotesLocal.convertKeychainVersion0ToVersion1();
      if (oldChain) {
        return oldChain;
      }
      // Return a new Chain (not saved to Chain)
      return { v: VotesLocal.KEYCHAIN_VERSION, d: [] };
    }
    // Normal read
    const indexchain = JSON.parse(keyindex.password);
    indexchain.d = [];

    // Find all Buckets and retrive data
    await Promise.all(
      indexchain.i.map(async (serviceId: number) => {
        const service = `${VotesLocal.KEYCHAIN_VOTES_SERVICE}${serviceId}`;
        const setData = await Keychain.getGenericPassword({ service });
        if (setData) {
          indexchain.d.push(...JSON.parse(setData.password));
        }
      }),
    );

    // Cleanup index & return
    delete indexchain.i;
    return indexchain;
  };

  // Write a v1 Chain
  static writeKeychain = async (data: Chain) => {
    // Split Data into packages to avoid error on 65k
    // https://github.com/oblador/react-native-keychain/issues/184
    const index = [];
    while (data.d && data.d.length > 0) {
      const set = data.d.splice(0, VotesLocal.KEYCHAIN_MAXSIZE);
      const setServiceId: number = index.length;
      const setService = VotesLocal.KEYCHAIN_VOTES_SERVICE + setServiceId;
      // Write Bucket
      await Keychain.setGenericPassword(
        VotesLocal.KEYCHAIN_VOTES_KEY,
        JSON.stringify(set),
        { service: setService },
      );
      index.push(setServiceId);
    }

    // Delete Data, Add Index
    data.d = [];
    data.i = index;

    // Write Index
    return await Keychain.setGenericPassword(
      VotesLocal.KEYCHAIN_INDEX_KEY,
      JSON.stringify(data),
      { service: VotesLocal.KEYCHAIN_INDEX_SERVICE },
    );
  };

  static mergeKeychains = async (newChain: Chain): Promise<Chain> => {
    const currentKeychain = await VotesLocal.readKeychain();
    // remove votes which are already voted in old chain (new phone)
    const cleandNewChain = newChain.d.filter(
      ({ i }) => !currentKeychain.d.some(({ i: ci }) => ci === i),
    );
    const mergedChain = {
      ...currentKeychain,
      d: [...cleandNewChain, ...currentKeychain.d],
    };
    await VotesLocal.writeKeychain(mergedChain);
    return mergedChain;
  };

  // Get Version of given chain
  private static getKeychainVersion = (chain: Chain) => {
    if (!chain) {
      return null;
    }
    if (!chain.v) {
      return 0;
    }
    return chain.v;
  };

  // Check if given chain has the correct properties
  private static validateKeychain = (chain: Chain) => {
    if (
      !chain ||
      !chain.v ||
      chain.v !== VotesLocal.KEYCHAIN_VERSION ||
      !chain.i
    ) {
      return false;
    }
    return true;
  };

  // Convert the Keychain from v0 to v1
  private static convertKeychainVersion0ToVersion1 = async () => {
    // Get v0 Chain
    const oldChainRaw = await Keychain.getGenericPassword(
      VotesLocal.KEYCHAIN_VOTES_SERVICE_VERSION_0,
    );
    // Old Chain present?
    if (!oldChainRaw) {
      return false;
    }
    const oldChain = JSON.parse(oldChainRaw.password);

    // Determin Version
    const version = await VotesLocal.getKeychainVersion(oldChain);
    if (version !== 0) {
      return false;
    }

    // Convert Chain
    const oldChainKeyValue = Object.entries<ChainOldEntryValueRaw>(oldChain);
    const newChain = oldChainKeyValue.reduce<Chain>(
      (prev, currentValue) => {
        const [key] = currentValue;
        let [, value] = currentValue;
        if (value === 0) {
          value = null;
        }
        // Time is 1970-01-01T00:00:00.000Z
        return {
          ...prev,
          d: [
            ...prev.d,
            { i: key, s: value, t: new Date(0).toISOString(), c: null },
          ],
        };
      },
      { v: VotesLocal.KEYCHAIN_VERSION, d: [] },
    );

    // Retrun converted Chain
    return newChain;
  };

  // Convert a Data Object from the Chain to return Object
  private static convertFromKeychain = ({ i, s, t, c }: ChainEntryRaw) => {
    let selection: ChainEntry['selection'] | undefined;
    switch (s) {
      case 1:
        selection = 'YES';
        break;
      case 2:
        selection = 'ABSTINATION';
        break;
      case 3:
        selection = 'NO';
        break;
      default:
        selection = undefined;
        break;
    }
    if (!selection) {
      return;
    }
    return {
      procedureId: i,
      selection,
      time: new Date(t),
      constituency: c,
    };
  };

  // Convert a Data Object to a Chain Object
  private static convertToKeychain = ({
    procedureId,
    selection,
    time,
    constituency,
  }: ChainEntry) => {
    let s: ChainEntryRaw['s'];
    switch (selection) {
      case 'YES':
        s = 1;
        break;
      case 'ABSTINATION':
        s = 2;
        break;
      case 'NO':
        s = 3;
        break;
      default:
        s = null;
        break;
    }
    return { i: procedureId, s, t: time.toISOString(), c: constituency };
  };

  // Get the VoteData for given procedureId
  static getVote = async (procedureId: string) => {
    const chain = await VotesLocal.readKeychain();

    // Find the requested Data
    const data = chain.d.find(({ i }) => {
      return i === procedureId;
    });
    // No data in Chain
    if (!data) {
      return null;
    }

    // Return converted result
    return VotesLocal.convertFromKeychain(data);
  };

  // Get all available VoteData
  static getVotes = async (): Promise<ChainEntry[]> => {
    const chain = await VotesLocal.readKeychain();

    return chain.d.reduce<ChainEntry[]>((prev, val) => {
      const entry = VotesLocal.convertFromKeychain(val);
      if (entry) {
        return [...prev, entry];
      }
      return prev;
    }, []);
  };

  // Write VoteData
  static setVote = async ({
    procedureId,
    selection,
    constituency,
  }: SetLocalVote) => {
    const chain = await VotesLocal.readKeychain();

    // Construct Chain Data Object
    const newVote = VotesLocal.convertToKeychain({
      procedureId,
      selection,
      time: new Date(),
      constituency,
    });

    // Find the requested Data index
    const dataIndex = chain.d.findIndex(({ i }) => i === procedureId);
    // Data not in the Chain
    if (dataIndex === -1) {
      chain.d.push(newVote);
    } else {
      // Data is already in the Chain
      chain.d[dataIndex] = newVote;
    }

    // Write Chain
    return VotesLocal.writeKeychain(chain);
  };

  // Reset Chain
  // For Debug purposes only

  public static reset = async () => {
    // Delete Chain
    // await Keychain.resetGenericPassword(VotesLocal.KEYCHAIN_VOTES_SERVICE_VERSION_0);
    return await Keychain.resetGenericPassword({
      service: VotesLocal.KEYCHAIN_INDEX_SERVICE,
    });
  };
}

export default VotesLocal;
