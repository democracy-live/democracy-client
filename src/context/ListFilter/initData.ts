export interface FilterEntry {
  title: string;
  name?: string;
  value: boolean;
}

export interface FilterData {
  title: string;
  name: string;
  data: FilterEntry[];
}

export const filterData: FilterData[] = [
  {
    name: 'activity',
    title: 'Aktivität',
    data: [
      {
        title: 'Nicht Abgestimmt',
        name: 'notVoted',
        value: true,
      },
      {
        title: 'Abgestimmt',
        name: 'voted',
        value: true,
      },
    ],
  },
  {
    name: 'type',
    title: 'Vorgangstyp',
    data: [
      {
        title: 'Antrag',
        value: true,
      },
      {
        title: 'Gesetzgebung',
        value: true,
      },
    ],
  },
  {
    name: 'subjectGroups',
    title: 'Sachgebiete',
    data: [
      {
        title: 'Arbeit und Beschäftigung',
        value: true,
      },
      {
        title: 'Ausländerpolitik, Zuwanderung',
        value: true,
      },
      {
        title: 'Außenpolitik und internationale Beziehungen',
        value: true,
      },
      {
        title: 'Außenwirtschaft',
        value: true,
      },
      {
        title: 'Bildung und Erziehung',
        value: true,
      },
      {
        title: 'Bundestag',
        value: true,
      },
      {
        title: 'Energie',
        value: true,
      },
      {
        title: 'Entwicklungspolitik',
        value: true,
      },
      {
        title: 'Europapolitik und Europäische Union',
        value: true,
      },
      {
        title: 'Gesellschaftspolitik, soziale Gruppen',
        value: true,
      },
      {
        title: 'Gesundheit',
        value: true,
      },
      {
        title: 'Innere Sicherheit',
        value: true,
      },
      {
        title: 'Kultur',
        value: true,
      },
      {
        title: 'Landwirtschaft und Ernährung',
        value: true,
      },
      {
        title: 'Medien, Kommunikation und Informationstechnik',
        value: true,
      },
      {
        title: 'Neue Bundesländer',
        value: true,
      },
      {
        title: 'Öffentliche Finanzen, Steuern und Abgaben',
        value: true,
      },
      {
        title: 'Politisches Leben, Parteien',
        value: true,
      },
      {
        title: 'Raumordnung, Bau- und Wohnungswesen',
        value: true,
      },
      {
        title: 'Recht',
        value: true,
      },
      {
        title: 'Soziale Sicherung',
        value: true,
      },
      {
        title: 'Sport, Freizeit und Tourismus',
        value: true,
      },
      {
        title: 'Staat und Verwaltung',
        value: true,
      },
      {
        title: 'Umwelt',
        value: true,
      },
      {
        title: 'Verkehr',
        value: true,
      },
      {
        title: 'Verteidigung',
        value: true,
      },
      {
        title: 'Wirtschaft',
        value: true,
      },
      {
        title: 'Wissenschaft, Forschung und Technologie',
        value: true,
      },
    ],
  },
];
