function bankCardAttribution(bankCard){
  var cardTypeMap = {
    DC: "储蓄卡",
    CC: "信用卡",
    SCC: "准贷记卡",
    PC: "预付费卡"
  };
  function extend(target, source) {
    var result = {};
    var key;
    target = target || {};
    source = source || {};
    for (key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = target[key];
      }
    }
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        result[key] = source[key];
      }
    }
    return result;
  }
  function getCardTypeName(cardType) {
    if (cardTypeMap[cardType]) {
      return cardTypeMap[cardType];
    }
    return undefined;
  }
  var bankcardList = 

   function getBankNameByBankCode(bankcode) {
    for (var i = 0, len = bankcardList.length; i < len; i++) {
      var bankcard = bankcardList[i];
      if (bankcode == bankcard.bankCode) {
        return bankcard.bankName;
      }
    }
    return "";
  }

  function _getBankInfoByCardNo(cardNo) {
    for (var i = 0, len = bankcardList.length; i < len; i++) {
      var bankcard = bankcardList[i];
      var patterns = bankcard.patterns;
      for (var j = 0, jLen = patterns.length; j < jLen; j++) {
        var pattern = patterns[j];
        if ((new RegExp(pattern.reg)).test(cardNo)) {
          var info = extend(bankcard, pattern);
          delete info.patterns;
          delete info.reg;
          info['cardTypeName'] = getCardTypeName(info['cardType']);
          return info;
        }
      }
    }
    return 'error';
  }

  return _getBankInfoByCardNo( bankCard );
}

