var render = function () {
  var parser = function (template) {
    var ret = []
    var token
    var value
    var index
    var type
    var RE = /(<%(?!=)(([\s\S])+?)%>)|(<%=(([\s\S])+?)%>)/
    template = template.replace(/[\r\n]/g, '')
    var match = RE.exec(template)

    while (match) {
      token = match[0]
      type = token.indexOf('<%=') === 0 ? 2 : 1
      value = type === 1 ? match[2] : match[5]
      index = match.index
      if (index >= 0) {
        ret.push({
          type: 0,
          value: template.slice(0, index)
        })
      }
      ret.push({
        type: type,
        value: value
      })
      template = template.slice(index + token.length)
      match = RE.exec(template)
    }

    if (template.length) {
      ret.push({
        type: 0,
        value: template
      })
    }
    return ret
  }

  return function (template, option) {
    var data = parser(template)
    var fn = 'var ret = [] ; with(__obj__){'
    for (var i = 0, len = data.length; i < len; i++) {
      var item = data[i]
      if (item.type === 0) {
        fn += "ret.push('" + item.value + "');"
      } else if (item.type === 1) {
        fn += item.value + ';'
      } else if (item.type === 2) {
        fn += 'ret.push(' + item.value + ');'
      }
    }
    fn += '}; return ret.join("")'
    var cb = new Function('__obj__', fn)
    if (option) {
      return cb(option)
    } else {
      return cb
    }
  }

}()