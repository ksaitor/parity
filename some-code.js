/**
 * Lovely comments are lovely. So here we are!
 * Since the task was to "To apply as a JS wiz/full stack guy or gal, give us some code (jobs@parity.io) that processes this into a lovely-looking web (HTML/CSS/JS) document"
 * Since the wording of the task allowed for it, i had to make a few compromises.
 * Not SEO friendly
 */
const typeOf = (value) => {
  var s = typeof value;
  if (s === 'object') {
    if (value) {
      if (value instanceof Array) {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }
  return s;
}

const iterate = (node, parent,  depth) => {
  for (var key in node) {
    const datatype = typeOf(node[key])
    let div = document.createElement('div');
    div.className = `${key} ${datatype}`;
    parent.appendChild(div);
    let title = document.createElement('h'+(depth+2));
    title.textContent = key;
    div.appendChild(title);
    switch (datatype) {
      case 'number':
      case 'string':
        const el = document.createElement('span')
        el.textContent = node[key]
        div.appendChild(el);
        break;
      case 'boolean':
        const span = document.createElement('span')
        span.textContent = node[key] ? '✔' : '✘';
        div.appendChild(span);
        break;
      case 'array':
        // Handles only arrays of strings. Nested arrays — next time!
        for (let val of node[key]) {
          const el = document.createElement('span')
          el.textContent = val
          div.appendChild(el);
        }
        break;
      case 'object':
        iterate(node[key], div, depth+1);
        break;
      default:
        break;

    }
  }
}

iterate(job, document.getElementById('app'), 0)
