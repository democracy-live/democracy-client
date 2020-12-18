interface Faq {
  title: string;
  text: string;
}

export const faqData: Faq[] = [
  {
    title: 'Warum fehlt der Antragsteller?',
    text: `Immer wieder kam und kommt die Frage auf, warum wir den Antragsteller eines Papiers nicht ebenfalls unter den Detailinformationen eines Vorgangs anzeigen.

Dies hat einen ganz einfachen Grund: 
Eines der Kernanliegen von DEMOCRACY ist es, den Wandel von einer personen- bzw.  durch politische Farben dominierten und mit Versprechen und Emotionen geführten Politik hin zu einer an konkreten Entscheidungen erfahrbaren Sachpolitik mitzugestalten. Das Abstimmungsverhalten vorab mit politischen Farben zu beeinflussen, ist insofern nicht Teil dieses Kernkonzepts.

Nimm es als Chance, Deine (politischen) Einstellungen anhand der konkret vertretenen Inhalte nochmal zu überprüfen.`,
  },
  {
    title: 'Worüber wird abgestimmt?',
    text: `DEMOCRACY ermöglicht seinen Nutzern über die offiziellen Gesetze & Anträge des Bundestages abzustimmen, so als wären sie Bundestagsabgeordnete.

Die (Nutzer-)Abstimmung in der App findet dabei immer über das Gesetz/den Antrag an sich (und nicht über die Beschlussempfehlung) statt. Im Plenarsaal des Bundestages wird allerdings oft über die Beschlussempfehlung abgestimmt. Eine Zustimmung zu einer Beschlussempfehlung, die eines Ablehnung des Vorgangs vorschlägt, ist insofern invers zu zählen.
Innerhalb unserer Software haben wir einen Mechanismus implementiert, der die ggfs. notwendigen Umrechnungen vornimmt. 

Sollten Sie Diskrepanzen zwischen dem Beschlusstext und unserer Ergebnisaufzeichnung feststellen, bitten wir Sie, diese an prototyping@democracy-deutschland.de zu reporten. `,
  },
  {
    title: 'Warum ist meine Stimme grau und enthält ein Fragezeichen?',
    text:
      'Die Aufrechterhaltung des Abstimmungs- bzw. Wahlgeheimnis ist zentraler Bestandteil der DNA der DEMOCRACY App. Unser Konzept sieht insofern vor, Deine konkrete Abstimmungsentscheidung (Zugestimmt, Enthalten, Ablehnt) nur lokal auf Deinem Handy zu speichern und ausschließlich anonymisierte Stimmdaten an unseren Server zu übersenden. Der graue Button mit weißem Fragezeichen zeigt Dir an, dass Deine Stimme korrekt an unseren Server übertragen wurde, aber auf Deinem Handy verlorengegangen ist. Dazu kann es kommen, wenn Du die Cache-Daten der DEMOCRACY App via App-Manager löschst. Ein nachträgliches Ändern Deiner Stimme ist leider nicht möglich.',
  },
  {
    title: 'Gebt ihr meine Abstimmungsdaten an Dritte weiter?',
    text: `Nein. Die Betreiber der App DEMOCRACY nehmen den Schutz Deiner persönlichen Daten sehr ernst.
Unserer Meinung nach sind Nutzerdaten gerade keine handelbaren Wirtschaftsgüter, sondern im Sinne des Grundgesetzes zu schützen. Deshalb behandeln wir Deine personenbezogenen wie Abstimmungsdaten vertraulich entsprechend den gesetzlichen Datenschutzrichtlinien und geben sie selbstverständlich nicht an Dritte weiter. Damit Du Dich bei der Nutzung unserer App sicher fühlst, informieren wir Dich in unserer Datenschutzrichtlinie ausführlich darüber, welche Daten wir warum erheben und wie wir diese verarbeiten und nutzen, vgl.
[https://www.democracy-deutschland.de/#!datenschutz](https://www.democracy-deutschland.de/#!datenschutz)`,
  },
  {
    title: 'Wie stellt ihr meine Stimmanonymität sicher?',
    text: `Wahlgeheimnis bedeutet, dass während und nach einer Wahl keine Information bekannt werden darf, die darauf schließen lässt, was ein Wähler gewählt hat. Im Konkreten geht es also um die Trennung von Person und Stimme in Urnenbuch und Auszählung. Die Aufrechterhaltung dieses Abstimmungs- bzw. Wahlgeheimnis ist zentraler Bestandteil der DNA der DEMOCRACY App.
Unser Konzept sieht daher vor, jede Deiner Abstimmungsentscheidungen (Ja, Enthaltung, Nein als Stimme) von Deinen personenbezogenen Identifikationsdaten ( – dem Urnenbuch) zu trennen. DEMOCRACY speichert insofern lediglich eine Quittung Deiner Abstimmungsentscheidung lokal auf Deinem Handy, an den Server werden ausschließlich anonymisierte und nicht kommerziell nutzbare Daten übersendet. 

Das vollständige Konzept zur Stimmanonymisierung kannst du hier
[https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymität](https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymität)
nachlesen.`,
  },
  {
    title: 'Sensible Daten und Open Source – geht das?',
    text:
      'Ja. Open Source bedeutet, dass der Quellcode frei und offen ist. Die Daten der Nutzer sind kein Bestandteil des Quellcodes, sondern der entsprechenden Installation des freien Programms auf einem Server. Insofern ist der unberechtigte Zugriff auf Nutzerdaten durch Dritte durch unsere Open-Source-Eigenschaft nicht angetastet. Überdies wird jede Änderung im Code, bevor sie in den Betrieb übergeht, von uns geprüft. Somit wird der hohe Anspruch an guter Programmierung gewahrt und auch verhindert, dass dubioser Code einfließen kann.',
  },
  {
    title: 'Wie wird DEMOCRACY finanziert?',
    text: `DEMOCRACY ist eine gemeinnützige App, das heißt von Menschen für Menschen, um unsere Politik transparenter und zugänglicher zu machen. Da wir DEMOCRACY als eine werbefreie Plattform ohne Datenverkauf realisiert haben, kann unser Joker nur die gemeinschaftliche Finanzierung sein. Insofern wird DEMOCRACY, um die laufenden Kosten zu decken, auch nach dem initialen Crowdfunding durch Spenden finanziert.
Finanziell unterstützen kannst Du via [https://www.democracy-deutschland.de/#!donate](https://www.democracy-deutschland.de/#!donate).`,
  },
  {
    title: 'Was bedeuten die Beratungszustände?',
    text: `**Noch nicht beraten**
Der Bundestag hat den Vorgang noch nicht beraten.

**1.Beratung**
Vorrangiges Ziel der ersten Lesung ist es, auf Basis der Empfehlungen des Ältestenrates einen oder mehrere Ausschüsse zu bestimmen, die sich mit dem Gesetzentwurf fachlich auseinandersetzen und ihn für die zweite Lesung vorbereiten.
Werden mehrere Ausschüsse bestimmt, so erhält ein Ausschuss die Federführung. Er ist somit verantwortlich für den Fortgang des Verfahrens. Die anderen Ausschüsse haben mitberatende Funktion.

**Überwiesen**
Das Ziel der ersten Lesung ist erreicht: auf Basis der Empfehlungen des Ältestenrates wurde einer oder mehrere Ausschüsse bestimmt, die sich mit dem Gesetzentwurf fachlich auseinandersetzen und ihn für die zweite Lesung vorbereiten.

**Beschlussempfehlung liegt vor**
Die Detailarbeit der Gesetzgebung findet in den ständigen Ausschüssen statt, die nach den Mehrheitsverhältnissen des Plenums mit Abgeordneten aller Fraktionen besetzt sind. Die Ausschussmitglieder arbeiten sich in die Materie ein und beraten sich in Sitzungen. Sie können auch Interessenvertreter und Experten zu öffentlichen Anhörungen einladen. Parallel zur Ausschussarbeit bilden die Fraktionen Arbeitsgruppen und Arbeitskreise, in denen sie ihre eigenen Positionen fachlich erarbeiten und definieren. In den Ausschüssen werden nicht selten Brücken zwischen den Fraktionen gebaut. Im Zusammenspiel von Regierungs- und Oppositionsfraktionen werden die meisten Gesetzentwürfe mehr oder weniger stark überarbeitet.
Nach Abschluss der Beratungen legt der federführende Ausschuss dem Plenum einen Bericht über den Verlauf und die Ergebnisse der Beratungen vor. Seine Beschlussempfehlungen sind die Grundlage für die nun folgende zweite Lesung im Plenum.

**2.Beratung**
Vor der zweiten Lesung haben alle Abgeordneten die veröffentlichte Beschlussempfehlung in gedruckter Form erhalten. Außerdem haben die Fraktionen zuvor in internen Sitzungen ihre Position noch einmal abgestimmt. Nach der allgemeinen Aussprache können alle Bestimmungen des Gesetzentwurfs einzeln aufgerufen werden. In der Regel wird aber direkt über den gesamten Gesetzentwurf abgestimmt.
Jedes Mitglied des Parlaments kann Änderungsanträge stellen, die dann im Plenum direkt behandelt werden. Beschließt das Plenum Änderungen, muss die neue Fassung des Gesetzentwurfs zunächst gedruckt und verteilt werden. Mit der Zustimmung von zwei Dritteln der anwesenden Mitglieder kann dieses Verfahren jedoch abgekürzt werden. Dann kann unmittelbar die dritte Lesung beginnen.

**3.Beratung**
In der dritten Lesung findet eine erneute Aussprache nur dann statt, wenn dies von einer Fraktion oder von mindestens fünf Prozent der Abgeordneten verlangt wird. Auch Änderungsanträge sind nun nicht mehr von einzelnen Abgeordneten, sondern nur noch von Fraktionen oder fünf Prozent der Mitglieder des Bundestages und auch nur zu Änderungen aus der zweiten Lesung zulässig.
Am Ende der dritten Lesung erfolgt die Schlussabstimmung. Auf die Frage des Bundestagspräsidenten nach Zustimmung, Gegenstimmen und Enthaltungen erheben sich die Abgeordneten von ihren Plätzen.

**Abgelehnt**
Hat der Gesetzentwurf die notwendige Mehrheit im Bundestag nicht gefunden, gilt das Verfahren als abgelehnt. Das Gesetzgebungsverfahren gilt somit als beendet.

**Angenommen**
Hat der Gesetzentwurf die notwendige Mehrheit im Bundestag gefunden, gilt er als angenommen und wird  als Gesetz dem Bundesrat zugeleitet.

**Unterrichtung des BR durch BT**
Durch den Bundesrat wirken die Länder bei jedem Gesetz mit. Ihre Mitwirkungsrechte sind dabei genau festgelegt.
Der Bundesrat kann keine Änderungen an dem vom Bundestag beschlossenen Gesetz vornehmen. Stimmt er dem Gesetz aber nicht zu, so kann er den Vermittlungsausschuss anrufen. Im Vermittlungsausschuss sitzen in gleicher Anzahl Mitglieder des Bundestages und des Bundesrates.
Bei Zustimmungsgesetzen ist die Zustimmung des Bundesrates zwingend erforderlich. Das sind zum Beispiel Gesetze, die die Finanzen und Verwaltungszuständigkeit der Länder betreffen. Zustimmungsbedürftig sind insbesondere verfassungsändernde Gesetze im Sinne des Artikels 79 Absatz 2 des Grundgesetzes.
Bei Einspruchsgesetzen kann der Bundestag ein Gesetz auch dann in Kraft treten lassen, wenn es im Vermittlungsausschuss zu keiner Einigung gekommen ist. Dazu ist aber in einer erneuten Abstimmung im Bundestag eine absolute Mehrheit erforderlich.

**Verabschiedet**
Hat der Bundesrat den Vermittlungsausschuss nicht angerufen oder dem Gesetz zugestimmt, gilt das Gesetz als verabschiedet.

In inhaltlicher Anlehnung an: [https://www.bundestag.de/parlament/aufgaben/gesetzgebung_neu/gesetzgebung/weg/255468](https://www.bundestag.de/parlament/aufgaben/gesetzgebung_neu/gesetzgebung/weg/255468)

`,
  },
  {
    title: 'Was ist der Wahl-o-Meter?',
    text: `Du kennst sicher den Wahl-o-Mat. In Vorbereitung auf eine anstehende Wahl ermöglicht Dir dieses Tool, die eigenen Stellungnahmen zu vordefinierten Fragen mit den autorisierten Antworten der verschiedenen Parteien zu vergleichen. Der Wahl-o-Mat kreuzt insofern die Wahlversprechen der Parteien mit Deinen Politik-Erwartungen. Vom Wahl-o-Mat nicht abgebildet wird dann allerdings das tatsächliche Abstimmungsverhalten der Parteien und PoltikerInnen in der darauffolgenden Legislaturperiode. Offen bleibt für Dich als BürgerIn insofern:

- Haben die Parteien das Versprochene umgesetzt und
- wie hat der von mir gewählte Direktkandidat / die von mir gewählte Partei (in mir wichtigen Belangen) abgestimmt?

Der **Wahl-o-Meter** setzt genau an diesem Punkt an.
Entsprechend des Wahl-O-Mats, bekommst Du mit dem Wahl-o-Meter eine Auswertungsmöglichkeit zur Verfügung gestellt, die Dir für den parlamentarischen Echtbetrieb zeigt, mit welcher (Bundestagas-)Partei Du wie stark übereinstimmst. Mathematisch bildet der Wahl-o-Meter dafür ebenfalls Mittelwerte Deiner Zustimmungen, Ablehnungen und neutralen Antworten mit den Zustimmungen, Ablehnungen und neutralen Antworten jeder Partei und sortiert diese Mittelwerte absteigend. 

Mehr Informationen dazu findest Du unter:
[https://github.com/demokratie-live/democracy-docu/wiki/Wahl-o-Meter](https://github.com/demokratie-live/democracy-docu/wiki/Wahl-o-Meter)`,
  },
  {
    title: 'Wie kann ich Mithelfen?',
    text: `Spenden und Daueraufträge sind nur eine Möglichkeit, uns zu unterstützen. Hier haben wir eine Liste von Tätigkeiten aufgeführt, die Du sofort angehen kannst, wenn Du bei DEMOCRACY mithelfen möchtest.

**LEVEL 1 – Für Einsteiger**
- Benutze DEMOCRACY und stimme app
- Teile unseren DEMOCRACY Erklärfilm mit einem kleinen, persönlichen, für Deine Freunde motivierenden Text bei Facebook, Twitter oder dem Sozialen Netzwerk Deiner Wahl
- Kommentiere DEMOCRACY-Beiträge und stelle Fragen auf Social Media
- Bewerte DEMOCRACY im App- bzw. PlayStore mit bis zu 5 Sternen
- Teile einen für Dich relevanten Bundestagsvorgang mit Deinen engsten Freuden via Messenger (WhatsApp, Telegram, …)
- Like unsere [Facebook-Seite](https://www.facebook.com/democracygermany/)
- Folge uns bei [Twitter](https://twitter.com/democracy_de)
- Entwickler-Special: Gib uns einen [Stern auf Github](https://github.com/demokratie-live/democracy-client)

**LEVEL 2 – Für Fortgeschrittene**
- Teile regelmäßig konkrete Bundestagsvorgänge via Facebook, Twitter oder per Messenger
- Sprich beim nächsten Abendessen mit Deinen Bekannten das Thema DEMOCRACY an und diskutiere mit ihnen über die Möglichkeit, per App am Bundestag teilzunehmen. Für jeden überzeugten neuen Nutzer gib Dir selbst einen Punkt. 
- Lass ein Foto von Dir machen wie Du DEMOCRACY benutzt und teile es auf Instagram & Co mit den Hashtags #democracymatters und #appstimmen

**LEVEL 3 – Für Profis**
- Schreibe über DEMOCRACY auf Deiner eigenen Seite/Blog/Timeline
- Tritt in direkte Kommunikation mit uns via [Discord](https://discordapp.com/invite/Pdu3ZEV) oder [per Mail](mailto:contact@democracy-deutschland.de)
- Überlege Dir, zu welchen strategischen Partnern oder Multiplikatoren Du als ScharniernetzwerkerIn für DEMOCRACY botschaften kannst 
- Sprich diese Netzwerke auf eigene Initiative an – für fachliche Rückfragen stehen wir jederzeit zur Verfügung
- Schlage selbst ein Feature vor, dass Du in einer künftigen Version von DEMOCRACY umgesetzt sehen willst
- Entwickler-Special: Prüfe unseren [Code](https://github.com/demokratie-live) und/oder entwickle mit.

Außerdem suchen wir ständig motivierte Menschen für die aktive Mitarbeit in unserem Projekt! Du hast Interesse Deine Fähigkeiten einzubringen – wir freuen uns über Anregungen, Fragen und Kritik. Hier kannst Du Dich als Freiwilliger melden – [https://www.democracy-deutschland.de/#!engineering#help](https://www.democracy-deutschland.de/#!engineering#help)
`,
  },
];
