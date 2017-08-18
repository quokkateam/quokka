var TextHelper;

class TH {

  toProperDelimit(arr, connector) {
    if (arr.length > 2) {
      var last = arr.pop();
      return [(arr.join(', ') + ','), last].join(connector);
    } else {
      return arr.join(connector);
    }
  }

}

function getInstance() {
  if (!TextHelper) {
    TextHelper = new TH();
  }

  return TextHelper;
}

export default getInstance();