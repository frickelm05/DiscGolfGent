// Alle gegevens van het weekend. Scores aanpassen gebeurt hier.
window.DG = {
  titel: "Discgolf Kampioen Weekend 2026",

  spelers: [
    {
      id: "frickel", naam: "Frickel", bijnaam: "Frikczzzzz",
      foto: "img/spelers/frickel.jpg", video: "video/worp3.mp4",
      bio: "Begon vrijdag met een birdie op hole 1 en dacht toen even dat hij pro was. Hole 15 heeft hem daar snel van genezen. Langste van de bende, dus ook het langste armbereik, en toch landt zijn disc soms bij de buren in de haag. Heeft de trofeeën zelf gekocht, dus winnen is voor hem gewoon zijn investering terugverdienen."
    },
    {
      id: "maur", naam: "Maur", bijnaam: "De chauffeur",
      foto: "img/spelers/maur.jpg", video: "video/worp2.mp4",
      bio: "Kale kop, zonnebril en snor: de enige die er op het parcours uitziet alsof hij gesponsord wordt. Chauffeur van dienst, dus wie een disc kwijt is kijkt best eerst in zijn koffer. Speelde vrijdag een sterke ronde tot hole 14 hem een acht aansmeerde. Daar wil hij het liever niet over hebben."
    },
    {
      id: "cedric", naam: "Cédric", bijnaam: "De selfiekoning",
      foto: "img/spelers/cedric.jpg", video: "video/worp5.mp4",
      bio: "Op elke groepsfoto staat zijn hoofd vooraan en het grootst, want hij houdt de gsm vast. Lacht altijd, ook na een zes. Sloot vrijdag af met een par op de laatste hole en vindt dat zelf het moment van het weekend tot nu toe."
    },
    {
      id: "simon", naam: "Simon", bijnaam: "Simonitis",
      foto: "img/spelers/simon.jpg", video: "video/worp4.mp4",
      bio: "Op UDisc beter bekend als Simonitis, een aandoening waarbij de disc telkens net naast de korf valt. Gooide vrijdag op geen enkele hole een drie, op een parcours vol par drie. Dat is geen pech meer, dat is een stijl. Wel de meest constante speler van de groep: je weet altijd wat je krijgt."
    },
    {
      id: "laurens", naam: "Laurens", bijnaam: "De kiné",
      foto: "img/spelers/laurens.jpg", video: null,
      bio: "Kinesitherapeut met een eigen praktijk, dus de enige die na een slechte worp meteen weet welke spier hij de schuld kan geven. Poseert graag met een disc voor zijn gezicht, waarschijnlijk uit voorzorg. Staat nog niet op een scorekaart dit weekend."
    },
    {
      id: "nico", naam: "Nico", bijnaam: "Het mysterie",
      foto: null, video: null,
      bio: "Er bestaat geen enkele foto van Nico. Niemand weet hoe hij gooit, niemand weet hoe hij eruitziet. Sommigen zeggen dat hij de beste van de groep is, anderen dat hij niet bestaat. Zijn eerste scorekaart zal het uitwijzen."
    }
  ],

  // Volgorde = volgorde van het weekend
  parcours: [
    {
      id: "bully", dag: "Vrijdag", datum: "2026-10-02",
      naam: "Parc du Terril du 2", plaats: "Bully-les-Mines", kort: "Bully",
      kleur: "#6E45C9", rit: "5 min", holes: 18, par: 58,
      udisc: "https://udisc.com/courses/bully-les-mines-parc-du-terril-du-2-LoPq",
      tekst: "Gebouwd op een oude terril, dus klimmen tussen de holes. Technisch parcours met tunnelworpen door het bos, veel OB en mando's, en hole 13 over de groeve waar je best iemand laat spotten.",
      holeInfo: [
        [4,137],[3,70],[3,79],[4,124],[3,77],[3,85],[4,133],[3,74],[3,90],
        [3,96],[3,82],[3,99],[3,92],[3,115],[4,137],[3,86],[3,77],[3,60]
      ]
    },
    {
      id: "vendin", dag: "Zaterdag", datum: "2026-10-03",
      naam: "Parc des Faitelles", plaats: "Vendin-le-Vieil", kort: "Vendin",
      kleur: "#EF7D1A", rit: "14 min", holes: 18, par: 58,
      udisc: "https://udisc.com/courses/vendin-le-vieil-parc-des-faitelles-u3I2",
      tekst: "Parkparcours dat grotendeels vlak ligt, met een mix van open holes en stukken tussen de bomen. Ziet er makkelijker uit dan het is. Toiletten in sportcentrum Trait d'Union ernaast.",
      holeInfo: null
    },
    {
      id: "lievin", dag: "Zondag", datum: "2026-10-04",
      naam: "Val de Souchez", plaats: "Liévin", kort: "Liévin",
      kleur: "#2E9157", rit: "11 min", holes: 18, par: 57,
      udisc: "https://udisc.com/courses/lievin-val-de-souchez-tXh4",
      tekst: "Groot heuvelachtig park met open holes, stukken bos en een paar mooie worpen bergaf. Er ligt water op het parcours, met een alternatieve hole als het hoog staat. Het best gequoteerde parcours van de drie, dus een waardige finale.",
      holeInfo: null
    }
  ],

  // Scores per hole, in de volgorde van holeInfo. Wie niet speelde: weglaten.
  rondes: {
    bully: {
      frickel: [3,3,5,4,4,3,5,4,4,4,3,4,4,4,8,3,3,4],
      maur:    [5,3,4,5,3,3,6,3,3,4,4,4,5,8,5,4,3,4],
      cedric:  [5,3,5,6,3,3,6,4,4,5,4,5,5,6,6,4,3,3],
      simon:   [5,4,5,6,4,4,7,5,4,5,4,5,4,5,6,5,4,4]
    },
    vendin: null,
    lievin: null
  },

  verlorenDiscs: { frickel: 0, maur: 0, cedric: 0, simon: 0, laurens: 0, nico: 0 },

  fotos: [
    "foto01","foto02","foto03","foto05","foto06","foto07","foto08","foto09","foto10"
  ],

  videos: [
    { src: "video/worp3.mp4", poster: "video/worp3.jpg", speler: "frickel" },
    { src: "video/worp2.mp4", poster: "video/worp2.jpg", speler: "maur" },
    { src: "video/worp5.mp4", poster: "video/worp5.jpg", speler: "cedric" },
    { src: "video/worp4.mp4", poster: "video/worp4.jpg", speler: "simon" },
    { src: "video/worp1.mp4", poster: "video/worp1.jpg", speler: null, titel: "Training in september" }
  ]
};
