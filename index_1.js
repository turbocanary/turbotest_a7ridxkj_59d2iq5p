function getSecureRandomSuffix() {
  // Use a cryptographically secure source of randomness to generate a number in [0, 1)
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    var arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] * Math.pow(2, -32);
  } else {
    // Fallback for environments like Node.js
    var crypto = require("crypto");
    var buf = crypto.randomBytes(4);
    var value =
      (buf[0] * 0x1000000 +
        buf[1] * 0x10000 +
        buf[2] * 0x100 +
        buf[3]) >>>
      0;
    return value * Math.pow(2, -32);
  }
}

function anotherInsecurePassword() {
  // GOOD: the random suffix is cryptographically secure
  var suffix = getSecureRandomSuffix();
  var password = "sssAAAA" + suffix;
  return password;
}