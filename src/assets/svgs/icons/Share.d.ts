import DefaultIos from './Share.ios';
import * as ios from './Share.ios';
import DefaultAndroid from './Share.android';
import * as android from './Share.android';

declare var _test: typeof ios;
declare var _test: typeof android;

declare var _testDefault: typeof DefaultIos;
declare var _testDefault: typeof DefaultAndroid;

export * from './Share.ios';
export default DefaultIos;
