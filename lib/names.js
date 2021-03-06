'use strict';

const upper = /[A-Z]/;

function camelize(name) {
  return name.replace(/-(\w)/g, (_, char) => char.toUpperCase());
}

function rename(name, ASYNC) {
  const a = upper.test(name[0]) ? 'A' : 'a';

  return ASYNC ? `${a}sync${name[0].toUpperCase()}${name.slice(1)}` : name;
}

function renameDollar(name, ASYNC) {
  const match = /\$(__?)?(.*)/.exec(name);
  if (!match) return name;
  const [, __ = '', name_] = match;

  return __ + rename(name_, ASYNC);
}

function syncName(name) {
  return name.startsWith('async')
    ? name[5].toLowerCase() + name.slice(6)
    : renameDollar(name, false);
}

function compareNames(a, b) {
  const aAsync = a.startsWith('async');
  const bAsync = b.startsWith('async');
  return aAsync && !bAsync ? 1 : bAsync && !aAsync ? -1 : a > b ? 1 : b > a ? -1 : 0;
}

module.exports = { camelize, rename, renameDollar, syncName, compareNames };