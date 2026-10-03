// All weekend data. Scores are updated here.
window.DG = {
  title: "Disc Golf Champions Weekend 2026",

  players: [
    {
      id: "frickel", name: "Frickel", nick: "OG Winner 2025",
      photo: "img/spelers/frickel.jpg", video: "video/worp3.mp4",
      bio: "Won it all in 2025 and has not stopped mentioning it since. Opened Friday with a birdie on hole 1 and took the day again, but after all the cheese at the house he might need a tree to shit behind before he needs a basket."
    },
    {
      id: "maur", name: "Maur", nick: "Sniperdisccer",
      photo: "img/spelers/maur.jpg", video: "video/worp2.mp4",
      bio: "The noetser with only a forehand. Does not like everyone watching him when he throws, but does not like it either when people keep talking around him. So stand still, stay quiet, look the other way, and maybe the sniper hits."
    },
    {
      id: "cedric", name: "Cédric", nick: "Sky High Flyer",
      photo: "img/spelers/cedric.jpg", video: "video/worp5.mp4",
      bio: "His discs fly sky high, as long as he remembers to bring them. The moment the vape comes out, his discs stay behind on the last tee. Always the first to ask for a break, to prep the vape or open a bottle of rosé."
    },
    {
      id: "simon", name: "Simon", nick: "Birdiemaster",
      photo: "img/spelers/simon.jpg", video: "video/worp4.mp4",
      bio: "The Birdiemaster, although so far the trees have seen more of his discs than the baskets. Hits every trunk on the course and keeps smiling. But we all know one day the birdies will come, and Simon will win it all."
    },
    {
      id: "laurens", name: "Laurens", nick: "FOMO-Homo",
      photo: "img/spelers/laurens.jpg", video: null,
      bio: "Already missed the first round on Friday, because Rosa is taking it all. Invested in a full bag of brand new discs, just to not be here. The best equipped player in the group, at home."
    },
    {
      id: "nico", name: "Nico", nick: "The drone pilot", plays: false,
      photo: "img/spelers/nico.jpg", video: null,
      bio: "Our drone pilot, only problem: he is still learning to fly that drone. Not one for throwing discs with us, but judging by the footage he might want to try. A disc at least comes back down."
    }
  ],

  // In weekend order
  courses: [
    {
      id: "bully", day: "Friday", date: "2026-10-02",
      name: "Parc du Terril du 2", town: "Bully-les-Mines", short: "Bully",
      color: "#6E45C9", drive: "5 min", holes: 18, par: 58,
      udisc: "https://udisc.com/courses/bully-les-mines-parc-du-terril-du-2-LoPq",
      geo: "50.458366,2.712496",
      text: "Built on an old mining slag heap, so expect climbing between holes. A technical course with tunnel shots through the woods, plenty of OB and mandos, and hole 13 across the quarry where you want someone spotting.",
      holeInfo: [
        [4,137],[3,70],[3,79],[4,124],[3,77],[3,85],[4,133],[3,74],[3,90],
        [3,96],[3,82],[3,99],[3,92],[3,115],[4,137],[3,86],[3,77],[3,60]
      ]
    },
    {
      id: "vendin", day: "Saturday", date: "2026-10-03",
      name: "Parc des Faitelles", town: "Vendin-le-Vieil", short: "Vendin",
      color: "#EF7D1A", drive: "14 min", holes: 18, par: 58,
      udisc: "https://udisc.com/courses/vendin-le-vieil-parc-des-faitelles-u3I2",
      geo: "50.462105,2.849380",
      text: "A park course that is mostly flat, mixing open holes with stretches between the trees. Looks easier than it plays. Toilets at the Trait d'Union sports centre next door.",
      holeInfo: null
    },
    {
      id: "lievin", day: "Sunday", date: "2026-10-04",
      name: "Val de Souchez", town: "Liévin", short: "Liévin",
      color: "#2E9157", drive: "11 min", holes: 18, par: 57,
      udisc: "https://udisc.com/courses/lievin-val-de-souchez-tXh4",
      geo: "50.410641,2.793863",
      text: "A big hilly park with open holes, wooded sections and some lovely downhill shots. There is water on the course, with an alternate hole when the level is high. The best rated course of the three, so a worthy final.",
      holeInfo: null
    }
  ],

  // Score per hole, in holeInfo order. Leave out whoever did not play.
  rounds: {
    bully: {
      frickel: [3,3,5,4,4,3,5,4,4,4,3,4,4,4,8,3,3,4],
      maur:    [5,3,4,5,3,3,6,3,3,4,4,4,5,8,5,4,3,4],
      cedric:  [5,3,5,6,3,3,6,4,4,5,4,5,5,6,6,4,3,3],
      simon:   [5,4,5,6,4,4,7,5,4,5,4,5,4,5,6,5,4,4]
    },
    vendin: null,
    lievin: null
  },

  lostDiscs: { frickel: 0, maur: 0, cedric: 0, simon: 0, laurens: 0 },

  photos: ["foto01","foto02","foto03","foto05","foto06","foto07","foto08","foto09","foto10","foto11","foto12","foto13","foto14","foto15","foto16","foto17","foto18","foto19","foto20","foto21","foto22","foto23","foto24","foto25","foto26"],

  // Extra videos for the photo wall (player videos already sit in the bios)
  wallVideos: [
    { src: "video/ceremonie2.mp4", poster: "video/ceremonie2.jpg", title: "Friday night ceremony" },
    { src: "video/ceremonie.mp4", poster: "video/ceremonie.jpg", title: "Friday night, filmed by the drone pilot" },
    { src: "video/worp6.mp4", poster: "video/worp6.jpg", title: "Practice throw" },
    { src: "video/worp1.mp4", poster: "video/worp1.jpg", title: "Practice in September" }
  ]
};
