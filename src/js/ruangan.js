let currentGedung = '1';
let currentLantai = '1';
let currentHari = 'Senin';

const gedungButtonsContainer = document.getElementById('gedung-buttons');
const lantaiButtonsContainer = document.getElementById('lantai-buttons');
const hariSelect = document.getElementById('hari-select');
const roomScheduleBody = document.getElementById('room-schedule-body');

async function fetchAndRenderRoomSchedule() {
    roomScheduleBody.innerHTML = '';

    const url = `/SIGARA/php/get_room_availability.php?gedung=${currentGedung}&lantai=${currentLantai}&hari=${currentHari}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'error') {
            roomScheduleBody.innerHTML = `<div class="p-4 text-center text-red-600">${data.message}</div>`;
            return;
        }

        const roomAvailabilityData = data.roomData;

        if (Object.keys(roomAvailabilityData).length === 0) {
            roomScheduleBody.innerHTML = `<div class="p-4 text-center text-gray-600">Tidak ada ruangan untuk Gedung ${currentGedung} Lantai ${currentLantai}.</div>`;
            return;
        }

        for (const roomName in roomAvailabilityData) {
            const slotStatuses = roomAvailabilityData[roomName];

            const row = document.createElement('div');
            row.className = 'grid grid-cols-11 text-center text-sm border-b border-gray-200';

            const roomCell = document.createElement('div');
            roomCell.className = 'p-3 border-r border-gray-200 font-medium text-gray-800 bg-gray-50';
            roomCell.textContent = roomName;
            row.appendChild(roomCell);

            slotStatuses.forEach(slot => {
                const cell = document.createElement('div');
                cell.className = 'p-3 border-r border-gray-200';

                if (typeof slot === 'object' && slot.status === 'Isi') {
                    cell.classList.add('bg-red-100', 'text-red-700', 'font-semibold');
                    cell.innerHTML = `
                        <div class="font-bold">Isi</div>
                        <div class="text-xs">${slot.kelas || ''}</div>`;
                } else {
                    cell.classList.add('bg-green-100', 'text-green-700', 'font-semibold');
                    cell.textContent = 'Kosong';
                }

                row.appendChild(cell);
            });

            roomScheduleBody.appendChild(row);
        }

    } catch (error) {
        console.error("Fetch error:", error);
        roomScheduleBody.innerHTML = `<div class="p-4 text-center text-red-600">Terjadi kesalahan saat mengambil data.</div>`;
    }
}

function updateActiveButton(container, activeValue, dataAttribute) {
    Array.from(container.children).forEach(button => {
        if (button.dataset[dataAttribute] === activeValue) {
            button.classList.add('bg-purple-700', 'text-white', 'shadow');
            button.classList.remove('bg-gray-200', 'text-gray-700');
        } else {
            button.classList.remove('bg-purple-700', 'text-white', 'shadow');
            button.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        }
    });
}

gedungButtonsContainer.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn?.dataset.gedung) {
        currentGedung = btn.dataset.gedung;
        currentLantai = '1';
        updateActiveButton(gedungButtonsContainer, currentGedung, 'gedung');
        updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');
        fetchAndRenderRoomSchedule();
    }
});

lantaiButtonsContainer.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (btn?.dataset.lantai) {
        currentLantai = btn.dataset.lantai;
        updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');
        fetchAndRenderRoomSchedule();
    }
});

hariSelect.addEventListener('change', () => {
    currentHari = hariSelect.value;
    fetchAndRenderRoomSchedule();
});

document.addEventListener('DOMContentLoaded', () => {
    updateActiveButton(gedungButtonsContainer, currentGedung, 'gedung');
    updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');
    currentHari = hariSelect.value;
    fetchAndRenderRoomSchedule();
});
