let rng = null;

function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function init(seed) {
  if (!seed) {
    seed = Math.random();
  }
  rng = mulberry32(seed);
  return rng;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  if (rng === null) {
    throw new Error("RNG module not initialized");
  }

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(rng() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export { init, shuffle };
