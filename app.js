const floors = {
  1: {
    title: "Tầng 1 — Tiếp đón & Khám bệnh",
    rooms: [
      { id: "TiemChung", name: "Tiêm chủng", x: 80, y: 70, w: 145, h: 95, node: [152,165] },
      { id: "CapCuu", name: "Cấp cứu", x: 80, y: 215, w: 145, h: 95, node: [152,310] },
      { id: "XetNghiem", name: "Xét nghiệm", x: 80, y: 360, w: 145, h: 95, node: [152,405] },
      { id: "KhamTongQuat", name: "Khám tổng quát", x: 300, y: 70, w: 155, h: 95, node: [377,165] },
      { id: "TaiMuiHong", name: "Tai – Mũi – Họng", x: 525, y: 70, w: 155, h: 95, node: [602,165] },
      { id: "NoiKhoa", name: "Nội khoa", x: 525, y: 215, w: 155, h: 95, node: [602,310] },
      { id: "Duoc", name: "Nhà thuốc", x: 525, y: 360, w: 155, h: 95, node: [602,405] },
      { id: "ThanhToan", name: "Thanh toán", x: 300, y: 360, w: 155, h: 95, node: [377,405] }
    ]
  },
  2: {
    title: "Tầng 2 — Chuyên khoa",
    rooms: [
      { id: "SanPhu", name: "Sản – Phụ khoa", x: 80, y: 70, w: 145, h: 95, node: [152,165] },
      { id: "Nhi", name: "Khoa Nhi", x: 80, y: 215, w: 145, h: 95, node: [152,310] },
      { id: "Mat", name: "Khoa Mắt", x: 80, y: 360, w: 145, h: 95, node: [152,405] },
      { id: "Ngoai", name: "Ngoại khoa", x: 300, y: 70, w: 155, h: 95, node: [377,165] },
      { id: "DaLieu", name: "Da liễu", x: 525, y: 70, w: 155, h: 95, node: [602,165] },
      { id: "RangHamMat", name: "Răng – Hàm – Mặt", x: 525, y: 215, w: 155, h: 95, node: [602,310] },
      { id: "ChanThuong", name: "Chấn thương", x: 525, y: 360, w: 155, h: 95, node: [602,405] },
      { id: "VatLyTriLieu", name: "Vật lý trị liệu", x: 300, y: 360, w: 155, h: 95, node: [377,405] }
    ]
  },
  3: {
    title: "Tầng 3 — Nội trú & Dịch vụ",
    rooms: [
      { id: "PhongYLenh", name: "Phòng y lệnh", x: 80, y: 70, w: 145, h: 95, node: [152,165] },
      { id: "KhuNoi", name: "Khu nội trú", x: 80, y: 215, w: 145, h: 95, node: [152,310] },
      { id: "NuoiBenh", name: "Chăm sóc nuôi bệnh", x: 80, y: 360, w: 145, h: 95, node: [152,405] },
      { id: "HoiChan", name: "Phòng hội chẩn", x: 300, y: 70, w: 155, h: 95, node: [377,165] },
      { id: "KhuNgoai", name: "Khu ngoại trú", x: 525, y: 70, w: 155, h: 95, node: [602,165] },
      { id: "GiuongBenh", name: "Khu giường bệnh", x: 525, y: 215, w: 155, h: 95, node: [602,310] },
      { id: "XQuang", name: "X-quang & Chẩn đoán", x: 525, y: 360, w: 155, h: 95, node: [602,405] },
      { id: "AnToan", name: "An toàn sinh học", x: 300, y: 360, w: 155, h: 95, node: [377,405] }
    ]
  }
};

let currentFloor = 1;
let selectedRoom = null;

const mapContent = document.getElementById("map-content");
const floorTitle = document.getElementById("floor-title");
const floorButtons = document.getElementById("floor-buttons");
const search = document.getElementById("room-search");
const suggestions = document.getElementById("suggestions");
const clearSearch = document.getElementById("clear-search");
const destinationCard = document.getElementById("destination-card");
const destinationName = document.getElementById("destination-name");
const startRouteButton = document.getElementById("start-route");
const routeInfo = document.getElementById("route-info");

for (let floor = 1; floor <= 3; floor++) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `floor-button${floor === 1 ? " active" : ""}`;
  button.textContent = `Tầng ${floor}`;
  button.addEventListener("click", () => switchFloor(floor));
  floorButtons.appendChild(button);
}

function svgEl(type, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", type);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function renderMap() {
  mapContent.replaceChildren();
  const data = floors[currentFloor];
  floorTitle.textContent = data.title;

  mapContent.appendChild(svgEl("rect", { x: 40, y: 40, width: 680, height: 430, rx: 18, fill: "#f9fcfb", stroke: "#91aaa8", "stroke-width": 2 }));
  mapContent.appendChild(svgEl("rect", { x: 245, y: 165, width: 270, height: 170, rx: 12, class: "corridor" }));

  const corridors = [
    [225, 117, 525, 117], [225, 262, 525, 262], [225, 407, 525, 407],
    [377, 165, 377, 405], [152, 165, 152, 405], [602, 165, 602, 405]
  ];
  corridors.forEach(([x1, y1, x2, y2]) => {
    mapContent.appendChild(svgEl("line", { x1, y1, x2, y2, class: "wall", "stroke-width": 18, stroke: "#dcebe9" }));
  });

  mapContent.appendChild(svgEl("rect", { x: 300, y: 215, width: 155, height: 95, rx: 12, fill: "#08757c", opacity: .95 }));
  const lobbyText = svgEl("text", { x: 377, y: 252, "text-anchor": "middle", fill: "white", "font-size": 15, "font-weight": 800 });
  lobbyText.textContent = "SẢNH CHÍNH";
  mapContent.appendChild(lobbyText);
  const lobbySub = svgEl("text", { x: 377, y: 274, "text-anchor": "middle", fill: "#dff1ef", "font-size": 11 });
  lobbySub.textContent = "Thang máy • Lễ tân";
  mapContent.appendChild(lobbySub);

  data.rooms.forEach(room => {
    const group = svgEl("g", { class: "room-group", role: "button", tabindex: "0", "data-id": room.id });
    const rect = svgEl("rect", { x: room.x, y: room.y, width: room.w, height: room.h, rx: 10, class: `room${selectedRoom?.id === room.id ? " selected" : ""}` });
    const name = svgEl("text", { x: room.x + room.w / 2, y: room.y + room.h / 2 - 3, class: "room-text" });
    name.textContent = room.name;
    const sub = svgEl("text", { x: room.x + room.w / 2, y: room.y + room.h / 2 + 17, class: "room-subtext" });
    sub.textContent = `Tầng ${currentFloor}`;
    group.append(rect, name, sub);
    group.addEventListener("click", () => selectRoom(room));
    group.addEventListener("keydown", event => { if (event.key === "Enter") selectRoom(room); });
    mapContent.appendChild(group);
  });

  // Điểm bắt đầu cố định tại sảnh tầng 1
  const start = svgEl("circle", { cx: 377, cy: 310, r: 13, class: "node start-node" });
  mapContent.appendChild(start);
}

function switchFloor(floor) {
  currentFloor = floor;
  document.querySelectorAll(".floor-button").forEach((button, i) => button.classList.toggle("active", i + 1 === floor));
  document.getElementById("you-are-here").style.display = floor === 1 ? "flex" : "none";
  if (selectedRoom && selectedRoom.floor !== floor) {
    clearDestination();
  }
  renderMap();
}

function selectRoom(room) {
  selectedRoom = { ...room, floor: currentFloor };
  search.value = room.name;
  clearSearch.hidden = false;
  suggestions.replaceChildren();
  destinationCard.hidden = false;
  destinationName.textContent = `${room.name} — Tầng ${currentFloor}`;
  startRouteButton.disabled = false;
  routeInfo.textContent = "";
  renderMap();
}

function clearDestination() {
  selectedRoom = null;
  search.value = "";
  clearSearch.hidden = true;
  suggestions.replaceChildren();
  destinationCard.hidden = true;
  startRouteButton.disabled = true;
  routeInfo.textContent = "";
  renderMap();
}

function getAllRooms() {
  return Object.entries(floors).flatMap(([floor, data]) =>
    data.rooms.map(room => ({ ...room, floor: Number(floor) }))
  );
}

search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  clearSearch.hidden = query.length === 0;
  suggestions.replaceChildren();
  if (!query) return;

  getAllRooms()
    .filter(room => `${room.name} tầng ${room.floor}`.toLowerCase().includes(query))
    .slice(0, 8)
    .forEach(room => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "suggestion";
      button.innerHTML = `<strong>${room.name}</strong><small>Tầng ${room.floor}</small>`;
      button.addEventListener("click", () => {
        switchFloor(room.floor);
        selectRoom(room);
      });
      suggestions.appendChild(button);
    });
});

clearSearch.addEventListener("click", clearDestination);
document.getElementById("clear-destination").addEventListener("click", clearDestination);

function getRoutePoints(room) {
  const start = [377, 310];
  const lobbyToRoom = [377, 262];
  const end = room.node;
  const points = [start];

  if (room.x < 300) {
    points.push(lobbyToRoom, [225, 262], [225, end[1]], end);
  } else if (room.x > 455) {
    points.push(lobbyToRoom, [525, 262], [525, end[1]], end);
  } else if (room.y < 215) {
    points.push(lobbyToRoom, [377, end[1]], end);
  } else if (room.y > 360) {
    points.push(lobbyToRoom, [377, end[1]], end);
  } else {
    points.push(lobbyToRoom, end);
  }
  return points;
}

startRouteButton.addEventListener("click", () => {
  if (!selectedRoom) return;
  switchFloor(selectedRoom.floor);
  const points = getRoutePoints(selectedRoom);
  const polyline = svgEl("polyline", { points: points.map(p => p.join(",")).join(" "), class: "route-line" });
  mapContent.insertBefore(polyline, mapContent.firstChild.nextSibling);

  const end = svgEl("circle", { cx: selectedRoom.node[0], cy: selectedRoom.node[1], r: 12, class: "node destination-node" });
  mapContent.appendChild(end);

  routeInfo.innerHTML = `<strong>Đường đến ${selectedRoom.name}</strong><br>Xuất phát: Sảnh chính tầng 1 → đi thẳng qua hành lang → rẽ đến điểm màu cam. Thời gian dự kiến: 3–5 phút.`;
  document.querySelector(".map-wrap").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

renderMap();
