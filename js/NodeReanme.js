/*
 * @Author: iepzh
 * @Description: 节点处理器
 * @Version: 1.0
 * @FilePath: \Scripts\JSFile\newSub.js
 */

const url = "http://ip-api.com/json?lang=zh-CN&fields=status,message,country,countryCode,city,query,isp";
const XHFGF = "➖";
const Oispflag = "📶";

const timeout = 5000;

let newnode = [];
let keyover = [];

const breaki = false;
let retryi = 0;

(async () => {
  $.subStoreJsonResource = new Map();
  let list = await ReadList();
  list = await OUTIA(list);
  $.write(list.join("\n"));
})();

function ReadList() {
  return new Promise((resolve) => {
    $.readFile($.files.list, (error, data) => {
      if (error) {
        $.error(`读取节点列表失败：${error.message}`);
        return resolve([]);
      }
      if (!data) {
        return resolve([]);
      }
      resolve(data.split("\n"));
    });
  });
}

function OUTIA(e) {
  const timeout = 1000;
  const MAX_CONCURRENCY = 5;
  let idx = 0;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async () => {
    const promises = [];
    for (let i = 0; i < MAX_CONCURRENCY && idx < e.length; i++) {
      const line = e[idx];
      if (line.trim() !== "") {
        promises.push(fetchNodeInfo(line));
      }
      idx++;
    }
    return Promise.all(promises);
  };

  const fetchNodeInfo = async (line) => {
    // Code for fetching node info goes here
    // For example:
    // const response = await $.http.get({ url: 'https://example.com/api', timeout });
    // const nodeInfo = response.body;
    // Modify the node information and update the list accordingly

    // Dummy sleep for simulation
    await sleep(100);
    return line;
  };

  const processNodes = async () => {
    let isBreak = false;
    do {
      await fetchData();
      isBreak = idx >= e.length;
    } while (!isBreak);
  };

  return new Promise(async (resolve) => {
    await processNodes();
    // Once all nodes are processed, resolve with the updated list
    resolve(e);
  });
}
function AliD(e) {
  const ti = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(e);
  if (ti) return e;

  const t = getaliid(e);
  if (alMap.has(t)) return alMap.get(t);

  const cached = scriptResourceCache.get(t);
  if (cached) {
    apiRead++;
    return cached;
  } else {
    inapi++;
  }

  const maxRE = 2;
  let alip = Math.random() < 0.5 ? '223.5.5.5' : '223.6.6.6';
  const url = `https://${alip}/resolve?name=${e}&type=A&short=1`;

  const getHttp = async (reTry) => {
    try {
      const response = await Promise.race([
        $.http.get({ url: url }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout-AliD")), timeout)),
      ]);

      const resdata = JSON.parse(response.body);
      if (resdata.length > 0) {
        scriptResourceCache.set(t, resdata[0]);
        return resdata[0];
      } else {
        return "keyn";
      }
    } catch (error) {
      if (reTry < maxRE) {
        await sleep(GRa());
        delog(e + " [->Ali超时查询次数] " + reTry);
        return getHttp(reTry + 1);
      } else {
        throw error;
      }
    }
  };

  const resGet = new Promise((resolve, reject) => {
    if (cd < 1 && onen) {
      return resGet;
    } else {
      getHttp(1)
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    }
  });

  alMap.set(t, resGet);
  return resGet;
}
function SPEC(e) {
  const n = getspcn(e);
  if (spMap.has(n)) return spMap.get(n);

  const cached = scriptResourceCache.get(n);
  if (cached) {
    apiRead++;
    return cached;
  } else {
    inapi++;
  }

  const maxRE = 2;
  const url = `https://api-v${keyp}${keypr}.cn/ip?ip=${e}`;

  const getHttp = async (reTry) => {
    try {
      const response = await Promise.race([
        $.http.get({ url: url }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout-SPEC")), timeout)),
      ]);

      const resdata = JSON.parse(response.body);
      delog(resdata);

      if (resdata.data) {
        const { country: e, province: o, city: r, isp: i, ip: c, countryCode: k } = resdata.data;
        const a = { country: e, regionName: o, city: r, isp: i, ip: c, countryCode: k };
        delog("写入");
        scriptResourceCache.set(n, a);
        return a;
      } else {
        throw new Error(resdata.message);
      }
    } catch (error) {
      if (reTry < maxRE) {
        await sleep(GRa());
        delog(e + "-> [SP超时查询次数] " + reTry);
        return getHttp(reTry + 1);
      } else {
        throw error;
      }
    }
  };

  const resGet = new Promise((resolve, reject) => {
    if (cd < 1 && onen) {
      return resGet;
    } else {
      getHttp(1)
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    }
  });

  spMap.set(n, resGet);
  return resGet;
}

const iaMap = new Map();
async function INIA(e) {
  const t = getinid(e);
  if (iaMap.has(t)) return iaMap.get(t);

  const cached = scriptResourceCache.get(t);
  if (cached) {
    apiRead++;
    return cached;
  } else {
    inapi++;
  }

  const maxRE = 2;
  const url = `http://ip-api.com/json/${e}?lang=zh-CN&fields=status,message,country,city,query,regionName,countryCode`;

  const getHttp = async (reTry) => {
    try {
      delog(url);
      const response = await Promise.race([
        $.http.get({ url: url }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout-INIA")), timeout)),
      ]);

      const data = JSON.parse(response.body);
      if (data.status === "success") {
        scriptResourceCache.set(t, data);
        return data;
      } else {
        throw new Error(resdata.message);
      }
    } catch (error) {
      if (reTry < maxRE) {
        await sleep(GRa());
        delog(e + "-> [inipApi超时查询次数] " + reTry);
        return getHttp(reTry + 1);
      } else {
        throw error;
      }
    }
  };

  const resGet = new Promise((resolve, reject) => {
    if (cd < 1 && onen) {
      return resGet;
    } else {
      getHttp(1)
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    }
  });

  iaMap.set(t, resGet);
  return resGet;
}

function GRa() {
  return Math.floor(Math.random() * (500 - 50 + 1) + 50);
}

function delog(...arg) {
  if (debug) {
    console.log("[节点处理器] :" + arg);
  }
}

function removels(e) {
  const t = new Set();
  const n = [];
  for (const s of e) {
    if (s.qc && !t.has(s.qc)) {
      t.add(s.qc);
      n.push(s);
    }
  }
  return n;
}

function removeqc(e) {
  const t = new Set();
  const n = [];
  for (const s of e) {
    if (!t.has(s.qc)) {
      t.add(s.qc);
      const e = { ...s };
      delete e.qc;
      n.push(e);
    }
  }
  return n;
}

function jxh(e) {
  const t = e.reduce((e, t) => {
    const n = e.find((e) => e.name === t.name);
    if (n) {
      n.count++;
      n.items.push({ ...t, name: `${t.name}${XHFGF}${n.count.toString().padStart(2, "0")}` });
    } else {
      e.push({ name: t.name, count: 1, items: [{ ...t, name: `${t.name}${XHFGF}01` }] });
    }
    return e;
  }, []);
  const n = t.flatMap((e) => e.items);
  e.splice(0, e.length, ...n);
  return e;
}

function onee(e) {
  const t = e.reduce((e, t) => {
    const n = t.name.replace(/[^A-Za-z0-9\u00C0-\u017F\u4E00-\u9FFF]+\d+$/, "");
    if (!e[n]) {
      e[n] = [];
    }
    e[n].push(t);
    return e;
  }, {});

  for (const e in t) {
    if (t[e].length === 1 && t[e][0].name.endsWith("01")) {
      const n = t[e][0];
      n.name = e;
    }
  }
  return e;
}

function zhTime(e) {
  e = e.toString().replace(/-/g, "");
  if (e < 1e3) {
    return `${Math.round(e)}毫秒`;
  } else if (e < 6e4) {
    return `${Math.round(e / 1e3)}秒`;
  } else if (e < 36e5) {
    return `${Math.round(e / 6e4)}分钟`;
  } else if (e >= 36e5) {
    return `${Math.round(e / 36e5)}小时`;
  }
}

var MD5 = function (e) {
  var t = M(V(Y(X(e), 8 * e.length)));
  return t.toLowerCase();
};

function M(e) {
  for (var t, n = "0123456789ABCDEF", s = "", o = 0; o < e.length; o++) t = e.charCodeAt(o), s += n.charAt((t >>> 4) & 15) + n.charAt(15 & t);
  return s;
}

function X(e) {
  for (var t = Array(e.length >> 2), n = 0; n < t.length), n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << (n % 32);
  return t;
}

function V(e) {
  for (var t = "", n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode((e[n >> 5] >>> (n % 32)) & 255);
  return t;
}

function Y(e, t) {
  e[t >> 5] |= 128 << (t % 32), e[14 + ((t + 64) >>> 9 << 4)] = t;

  for (var n = 1732584193, s = -271733879, o = -1732584194, r = 271733878, i = 0; i < e.length; i += 16) {
    var c = n,
      a = s,
      u = o,
      m = r;
    s = md5_ii(
      s = md5_ii(s = md5_ii(s = md5_ii(s = md5_hh(s = md5_hh(s = md5_hh(s = md5_hh(s = md5_gg(s = md5_gg(s = md5_gg(s = md5_gg(s = md5_ff(s = md5_ff(s = md5_ff(s = md5_ff(s, o = md5_ff(o, r = md5_ff(r, n = md5_ff(n, s, o, r, e[i + 0], 7, -680876936), s, o, e[i + 1], 12, -389564586), n, s, e[i + 2], 17, 606105819), r, n, e[i + 3], 22, -1044525330), o = md5_ff(o, r = md5_ff(r, n = md5_ff(n, s, o, r, e[i + 4], 7, -176418897), s, o, e[i + 5], 12, 1200080426), n, s, e[i + 6], 17, -1473231341), r, n, e[i + 7], 22, -45705983), o = md5_ff(o, r = md5_ff(r, n = md5_ff(n, s, o, r, e[i + 8], 7, 1770035416), s, o, e[i + 9], 12, -1958414417), n, s, e[i + 10], 17, -42063), r, n, e[i + 11], 22, -1990404162), o = md5_ff(o, r = md5_ff(r, n = md5_ff(n, s, o, r, e[i + 12], 7, 1804603682), s, o, e[i + 13], 12, -40341101), n, s, e[i + 14], 17, -1502002290), r, n, e[i + 15], 22, 1236535329),
      o = md5_gg(o, r = md5_gg(r, n = md5_gg(n, s, o, r, e[i + 1], 5, -165796510), s, o, e[i + 6], 9, -1069501632), n, s, e[i + 11], 14, 643717713),
      r = md5_gg(r, n = md5_gg(n, s, o, r, e[i + 0], 20, -373897302), s, o, e[i + 5], 5, -701558691),
      n = safe_add(n, c),
      s = safe_add(s, a),
      o = safe_add(o, u),
      r = safe_add(r, m);
  }

  return Array(n, s, o, r);
}

function md5_cmn(e, t, n, s, o, r) {
  return safe_add(bit_rol(safe_add(safe_add(t, e), safe_add(o, r)), n), e);
}

function md5_ff(e, t, n, s, o, r, i) {
  return md5_cmn(t & n | ~t & s, e, t, o, r, i);
}

function md5_gg(e, t, n, s, o, r, i) {
  return md5_cmn(t & s | n & ~s, e, t, o, r, i);
}

function md5_hh(e, t, n, s, o, r, i) {
  return md5_cmn(t ^ n ^ s, e, t, o, r, i);
}

function md5_ii(e, t, n, s, o, r, i) {
  return md5_cmn(n ^ (t | ~s), e, t, o, r, i);
}

function safe_add(e, t) {
  var n = (65535 & e) + (65535 & t);
  return ((e >> 16) + (t >> 16) + (n >> 16)) << 16 | (65535 & n);
}

function bit_rol(e, t) {
  return e << t | e >>> (32 - t);
}

function getid(e) {
  let t = "ld";
  return MD5(`${t}-${e.server}-${e.port}`);
}

function getinid(e) {
  let t = "ia";
  return MD5(`${t}-${e}`);
}