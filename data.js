// All weekend data. Scores are updated here.
window.DG = {
  title: "Disc Golf Champions Weekend 2026",

  players: [
    {
      id: "frickel", name: "Frickel", nick: "Frikczzzzz",
      photo: "img/spelers/frickel.jpg", video: "video/worp3.mp4",
      bio: "Opened Friday with a birdie on hole 1 and briefly believed he had turned pro. Hole 15 cured him of that pretty fast. Tallest of the gang, so the longest reach, and still his disc ends up in the neighbours' hedge now and then. He paid for the trophies himself, so for him winning is just getting his investment back."
    },
    {
      id: "maur", name: "Maur", nick: "The driver",
      photo: "img/spelers/maur.jpg", video: "video/worp2.mp4",
      bio: "Bald head, sunglasses and a moustache: the only one on the course who looks like he has a sponsor. Designated driver, so if your disc is missing, check his boot first. Played a strong round on Friday until hole 14 handed him an eight. He would rather not talk about it."
    },
    {
      id: "cedric", name: "Cédric", nick: "The selfie king",
      photo: "img/spelers/cedric.jpg", video: "video/worp5.mp4",
      bio: "In every group photo his head is in front and the biggest, because he is holding the phone. Always laughing, even after a six. Finished Friday with a par on the last hole and considers that the moment of the weekend so far."
    },
    {
      id: "simon", name: "Simon", nick: "Simonitis",
      photo: "img/spelers/simon.jpg", video: "video/worp4.mp4",
      bio: "Known on UDisc as Simonitis, a condition where the disc always lands just next to the basket. Did not throw a single three on Friday, on a course full of par threes. At some point that stops being bad luck and becomes a style. On the bright side, the most consistent player in the group: you always know what you are going to get."
    },
    {
      id: "laurens", name: "Laurens", nick: "The physio",
      photo: "img/spelers/laurens.jpg", video: null,
      bio: "Runs his own physio practice, so he is the only one who knows exactly which muscle to blame after a bad throw. Likes to pose with a disc in front of his face, probably as a precaution. Not on a scorecard yet this weekend."
    },
    {
      id: "nico", name: "Nico", nick: "The mystery",
      photo: null, video: null,
      bio: "There is not a single photo of Nico. Nobody knows how he throws, nobody knows what he looks like. Some say he is the best of the group, others say he does not exist. His first scorecard will tell."
    }
  ],

  // In weekend order
  courses: [
    {
      id: "bully", day: "Friday", date: "2026-10-02",
      name: "Parc du Terril du 2", town: "Bully-les-Mines", short: "Bully",
      color: "#6E45C9", drive: "5 min", holes: 18, par: 58,
      udisc: "https://udisc.com/courses/bully-les-mines-parc-du-terril-du-2-LoPq",
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
      text: "A park course that is mostly flat, mixing open holes with stretches between the trees. Looks easier than it plays. Toilets at the Trait d'Union sports centre next door.",
      holeInfo: null
    },
    {
      id: "lievin", day: "Sunday", date: "2026-10-04",
      name: "Val de Souchez", town: "Liévin", short: "Liévin",
      color: "#2E9157", drive: "11 min", holes: 18, par: 57,
      udisc: "https://udisc.com/courses/lievin-val-de-souchez-tXh4",
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

  lostDiscs: { frickel: 0, maur: 0, cedric: 0, simon: 0, laurens: 0, nico: 0 },

  photos: ["foto01","foto02","foto03","foto05","foto06","foto07","foto08","foto09","foto10"],

  // Extra videos for the photo wall (player videos already sit in the bios)
  wallVideos: [
    { src: "video/worp1.mp4", poster: "video/worp1.jpg", title: "Practice in September" }
  ]
};
