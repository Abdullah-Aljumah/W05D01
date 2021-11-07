function isPalindrome(x) {
  let reverse = x.toLowerCase().split("").reverse().join();
  x = x.toLowerCase().split("").join();
  for (i = 0; i < x.length; i++) {
    if (x[i] == reverse[i]) {
      return true;
    } else {
      return false;
    }
  }
}
isPalindrome();
