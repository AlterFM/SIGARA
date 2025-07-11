// File: pages/ruangan.js
        // --- 1. Data Dummy (Simulasi dari Database/API) ---
        // Ini adalah contoh struktur data. Dalam aplikasi nyata, ini akan datang dari backend.
        // Format: data[gedung][lantai][nomor_ruangan][jam] = status
        const roomData = {
            '1': { // Gedung 1
                '1': { // Lantai 1
                    'E111': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E112': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E113': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E114': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E115': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E116': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E117': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi'],
                    'E118': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E119': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong'],

                },
                '2': { // Lantai 2
                    'E121': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E122': ['Kosong', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E123': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E124': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E125': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E126': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E127': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E128': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi'],
                    'E129': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                },
                '3': { // Lantai 3
                    'E131': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E132': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E133': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E134': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E135': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E136': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E137': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E138': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E139': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong'],
                },
                '4': { // Lantai 4
                    'E141': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E142': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E143': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E144': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E145': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E146': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E147': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi'],
                    'E148': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E149': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong'],
                }
            },
            '2': { 
                '1': { // Lantai 1
                    'E211': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E212': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E213': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E214': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E215': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E216': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E217': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi'],
                    'E218': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E219': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong'],

                },
                '2': {
                    'E201': ['Kosong', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                }
            },
            '3': { // Gedung 3
                '1': { // Lantai 1
                    'E311': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E312': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E313': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E314': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E315': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E316': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E317': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E318': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E319': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],

                }
            },
            '4': { // Gedung 4
                '1': { // Lantai 1
                    'E411': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E412': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E413': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E414': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E415': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'E416': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'E417': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi'],
                    'E418': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'E419': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong'],
                }
            },
            '5': { // Gedung 5
                '1': { // Lantai 1
                    'E511': ['Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'H512': ['Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'H513': ['Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'H514': ['Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'H515': ['Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi', 'Isi'],
                    'H516': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi', 'Isi'],
                    'H517': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi', 'Isi'],
                    'H518': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong', 'Isi'],
                    'H519': ['Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Isi', 'Kosong'],

                }
            }
            
        };

        // --- 2. State Aplikasi (Gedung, Lantai, Tanggal, Hari, Jam yang sedang aktif) ---
        let currentGedung = '1'; // Default
        let currentLantai = '1'; // Default
        let currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
        let currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); // Current time HH:MM

        // --- 3. Referensi ke Elemen DOM ---
        const gedungButtonsContainer = document.getElementById('gedung-buttons');
        const lantaiButtonsContainer = document.getElementById('lantai-buttons');
        const tanggalInput = document.getElementById('tanggal');
        const hariInput = document.getElementById('hari');
        const jamInput = document.getElementById('jam');
        const roomScheduleBody = document.getElementById('room-schedule-body');
        const headerTimeDisplay = document.querySelector('header + main .flex.justify-between p');

        // --- 4. Fungsi Utility ---
        function getDayName(dateString) {
            const date = new Date(dateString);
            const options = { weekday: 'long' };
            return date.toLocaleDateString('id-ID', options); // 'id-ID' for Indonesian day names
        }

        function updateHeaderTime() {
            const now = new Date();
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

            const dateStr = now.toLocaleDateString('id-ID', optionsDate);
            const timeStr = now.toLocaleTimeString('id-ID', optionsTime);

            // Update the display for the current date and time
            // Note: The Figma image shows "Sabtu, 15 Mei 2025<br>Jam: 20 : 42" which seems static.
            // If you want real-time, uncomment/use this.
            // For now, I'll update the 'Waktu' section inputs based on current date/time
            // and keep the top-right header display based on the Figma's static text.
            // If you want top-right to be dynamic, update it here.
            // headerTimeDisplay.innerHTML = `${dateStr}<br>Jam: ${timeStr}`;
        }


        // --- 5. Fungsi Utama untuk Merender Tabel Ruangan ---
        function renderRoomSchedule() {
            roomScheduleBody.innerHTML = ''; // Kosongkan isi tabel sebelumnya

            // Ambil data untuk gedung dan lantai yang sedang aktif
            const selectedGedungData = roomData[currentGedung];
            if (!selectedGedungData) {
                roomScheduleBody.innerHTML = `<div class="p-4 text-center text-gray-600">Tidak ada data ruangan untuk Gedung ${currentGedung}.</div>`;
                return;
            }

            const selectedLantaiData = selectedGedungData[currentLantai];
            if (!selectedLantaiData) {
                roomScheduleBody.innerHTML = `<div class="p-4 text-center text-gray-600">Tidak ada data ruangan untuk Lantai ${currentLantai} di Gedung ${currentGedung}.</div>`;
                return;
            }

            // Iterasi melalui setiap ruangan di lantai yang dipilih
            for (const roomNumber in selectedLantaiData) {
                const schedule = selectedLantaiData[roomNumber]; // Array status 'Isi'/'Kosong'
                const row = document.createElement('div');
                row.className = 'grid grid-cols-10 text-center text-sm border-b border-gray-200 last:border-b-0';

                // Kolom Nama Ruangan
                const roomNameCell = document.createElement('div');
                roomNameCell.className = 'p-3 border-r border-gray-200 font-medium text-gray-800 bg-gray-50';
                roomNameCell.textContent = roomNumber;
                row.appendChild(roomNameCell);

                // Kolom Status Jam
                schedule.forEach(status => {
                    const statusCell = document.createElement('div');
                    statusCell.className = 'p-3 border-r border-gray-200';
                    if (status === 'Kosong') {
                        statusCell.classList.add('bg-red-100', 'text-red-700', 'font-semibold');
                    }
                    statusCell.textContent = status;
                    row.appendChild(statusCell);
                });
                roomScheduleBody.appendChild(row);
            }
        }

        // --- 6. Fungsi untuk Mengupdate Tampilan Tombol Aktif ---
        function updateActiveButton(container, activeValue, dataAttribute) {
            Array.from(container.children).forEach(button => {
                if (button.dataset[dataAttribute] === activeValue) {
                    button.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
                    button.classList.add('bg-purple-700', 'text-white', 'shadow');
                } else {
                    button.classList.remove('bg-purple-700', 'text-white', 'shadow');
                    button.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
                }
            });
        }

        // --- 7. Event Listeners ---

        // Event Listener untuk tombol Gedung
        gedungButtonsContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('button');
            if (clickedButton && clickedButton.dataset.gedung) {
                currentGedung = clickedButton.dataset.gedung;
                // Saat gedung berubah, reset lantai ke 1 (atau lantai pertama yang tersedia untuk gedung tersebut)
                const firstLantaiForGedung = Object.keys(roomData[currentGedung] || {})[0] || '1';
                currentLantai = firstLantaiForGedung;

                updateActiveButton(gedungButtonsContainer, currentGedung, 'gedung');
                // Panggil render schedule untuk lantai pertama di gedung baru
                renderRoomSchedule();
                // Perbarui juga tampilan tombol lantai agar lantai 1 (atau yang pertama) aktif
                updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');
            }
        });

        // Event Listener untuk tombol Lantai
        lantaiButtonsContainer.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('button');
            if (clickedButton && clickedButton.dataset.lantai) {
                currentLantai = clickedButton.dataset.lantai;
                updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');
                renderRoomSchedule(); // Render ulang schedule dengan lantai baru
            }
        });

        // Event Listener untuk input Tanggal
        tanggalInput.addEventListener('change', () => {
            currentDate = tanggalInput.value;
            hariInput.value = getDayName(currentDate); // Update Hari secara otomatis
            // Anda bisa tambahkan logika di sini jika status ruangan berubah berdasarkan tanggal
            // Misalnya, memanggil API backend dengan tanggal ini.
            // renderRoomSchedule(); // Uncomment jika status ruangan dinamis per tanggal
        });

        // Event Listener untuk input Jam
        jamInput.addEventListener('change', () => {
            currentTime = jamInput.value;
            // Anda bisa tambahkan logika di sini jika status ruangan berubah berdasarkan jam
            // Misalnya, menyorot kolom jam yang sesuai, atau memanggil API backend.
            // renderRoomSchedule(); // Uncomment jika status ruangan dinamis per jam
        });

        // --- 8. Inisialisasi Saat Halaman Dimuat ---
        document.addEventListener('DOMContentLoaded', () => {
            // Set input tanggal dan jam ke waktu saat ini
            tanggalInput.value = currentDate;
            hariInput.value = getDayName(currentDate);
            jamInput.value = currentTime.substring(0, 5); // Format HH:MM

            // Set tombol aktif awal
            updateActiveButton(gedungButtonsContainer, currentGedung, 'gedung');
            updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');

            // Render schedule awal
            renderRoomSchedule();

            // Update header time every minute (optional, if you want real-time clock)
            // setInterval(updateHeaderTime, 60000);
        });
