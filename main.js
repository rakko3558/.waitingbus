// ✅ 你只要改這兩個變數即可
const stopName = "臺北車站";            // ← 改站名
const targetBuses = ["307", "265"];    // ← 改公車清單

document.getElementById("station-name").textContent = stopName;

async function fetchBusInfo() {
  const api = `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei?$filter=Stops/any(s: s/StopName/Zh_tw eq '${stopName}')&$format=JSON`;

  try {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
const targetAPI = `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/Taipei?$filter=Stops/any(s: s/StopName/Zh_tw eq '${stopName}')&$format=JSON`;

const res = await fetch(corsProxy + targetAPI);

    const data = await res.json();

    const busesAtStop = new Set();

    data.forEach(route => {
      if (route?.RouteName?.Zh_tw) {
        busesAtStop.add(route.RouteName.Zh_tw);
      }
    });

    const list = document.getElementById("bus-list");
    list.innerHTML = "";

    targetBuses.forEach(bus => {
      const li = document.createElement("li");
      if (busesAtStop.has(bus)) {
        li.textContent = `✅ ${bus} 有停靠 ${stopName}`;
      } else {
        li.textContent = `❌ ${bus} 沒有停靠 ${stopName}`;
      }
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    document.getElementById("bus-list").innerHTML = "<li>載入失敗</li>";
  }
}

fetchBusInfo();
