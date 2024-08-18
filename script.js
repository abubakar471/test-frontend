
document.addEventListener("DOMContentLoaded", async () => {

    const fetchData = async () => {
        const api = "https://fedskillstest.coalitiontechnologies.workers.dev";
        let username = 'coalition';
        let password = 'skills-test';
        let auth = btoa(`${username}:${password}`);

        return fetch(api, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(function (data) {
            console.log(data[3])
            return data;
        }).catch(function (error) {
            console.warn(error);
        });
    }

    const response = await fetchData();
    const data = response[3];

    if (data) {
        // set name
        document.getElementById("patient-name").textContent = data?.name;

        // set date of birth
        let date_dob = new Date(data?.date_of_birth);
        console.log()
        document.getElementById("patient-dob").textContent = date_dob?.toDateString()?.slice(4,);

        // set gender
        document.getElementById("gender").textContent = data?.gender;

        // set phone number
        document.getElementById("phone").textContent = data?.phone_number;

        // set insurance provider
        document.getElementById("insurance-provider").textContent = data?.insurance_type;

        // set lab results
        const labResultsContainer = document.getElementById('lab-results-container');

        const lab_results = data?.lab_results?.map((item, index) => {
            const div = document.createElement('div');
            div.classList.add('lab-results-card', 'flex', 'items-center', 'justify-between', 'px-4', 'py-4', 'mx-6', 'rounded-lg', 'group', 'bg-white', 'hover:bg-[#F6F7F8]', 'transition-all', 'duration-300', 'ease-in-out', 'cursor-pointer');
            div.innerHTML = `
            <p class="bg-white group-hover:bg-[#F6F7F8] transition-all duration-300 ease-in-out">
              ${item}
            </p>
            <button class="border-none outline-none cursor-pointer">
              <img src="./public/assets/images/download.png" alt="download"
                   class="bg-white group-hover:bg-[#F6F7F8] transition-all duration-300 ease-in-out">
            </button>
          `;
            return div;
        });

        if (lab_results) {
            labResultsContainer.append(...lab_results);
        }

        // set diagonostic list
        const diagonosticListContainer = document.getElementById('diagonosticListContainer');
        const diagonosticList = data?.diagnostic_list?.map((item, index) => {
            const div = document.createElement('div');
            // div.classList.add('grid', 'grid-cols-12', 'mx-8', 'p-4', 'pb-10', 'group', 'bg-white', 'gap-16');

            div.innerHTML = ` <div class="grid grid-cols-12 mx-8 p-4 pb-10 group bg-white gap-16">
                            <div class="text-[#072635] text-[14px] bg-white col-span-3">
                                ${item?.name}
                            </div>
                            <div class="text-[#072635] text-[14px] bg-white col-span-6">
                                         ${item?.description}
                            </div>
                            <div class="text-[#072635] text-[14px] bg-white col-span-3">
                                 ${item?.status}
                            </div>
                        </div>`;

            return div;
        })

        if (diagonosticList) {
            diagonosticListContainer.append(...diagonosticList);
        }

        // set diagonostic data
        let diagonosis_history = data?.diagnosis_history?.filter((item) => item?.month === "August" && item?.year === 2023);

        diagonosis_history?.map((item) => {
            document.getElementById("respiratory-rate").textContent = item?.respiratory_rate?.value + ' bpm'
            document.getElementById("respiratory-levels").textContent = item?.respiratory_rate?.levels;
            document.getElementById("temperature").textContent = item?.temperature?.value + " °F";
            document.getElementById("temperature-levels").textContent = item?.temperature?.levels;
            document.getElementById("heart-rate").textContent = item?.heart_rate?.value + ' bpm'
            document.getElementById("heart-rate-levels").textContent = item?.heart_rate?.levels;
            document.getElementById("systolic-pressure").textContent = item?.blood_pressure?.systolic?.value
            document.getElementById("systolic-pressure-levels").textContent = item?.blood_pressure?.systolic?.levels
            document.getElementById("diastolic-pressure").textContent = item?.blood_pressure?.diastolic?.value
            document.getElementById("systolic-pressure-levels").textContent = item?.blood_pressure?.diastolic?.levels
        })



        // Chart.defaults.backgroundColor = '#F4F0FE';
        // Chart.defaults.borderColor = '#36A2EB';
        // Chart.defaults.color = '#000';
        let dataSetsDataBloodPressure = [];
        data?.diagnosis_history?.map((item, index) => {
            if (item?.year === 2023 || item?.year === 2024) {
                dataSetsDataBloodPressure.unshift(item)
            }
        })



        let dataSetsData = [
            // { x: "Oct, 2023", systolic: 120, diastolic: 100 },
            // { x: "Nov, 2023", systolic: 118, diastolic: 65 },
            // { x: "Dec, 2023", systolic: 160, diastolic: 103 },
            // { x: "Jan, 2024", systolic: 116, diastolic: 94 },
            // { x: "Feb, 2024", systolic: 145, diastolic: 74 },
            // { x: "Mar, 2024", systolic: 157, diastolic: 78 },
        ];

        dataSetsDataBloodPressure.slice(9)?.map((item) => {
            console.log(item)
            dataSetsData?.unshift({
                x: `${item?.month?.slice(0, 3)}, ${item?.year}`,
                systolic: `${item?.blood_pressure?.systolic?.value}`,
                diastolic: `${item?.blood_pressure?.diastolic?.value}`
            })
        })
        const chartData = {
            labels: ["Oct, 2023", "Nov, 2023", "Dec, 2023", "Jan, 2024", "Feb, 2024", "Mar, 2024"],
            datasets: [{
                label: 'Systolic',
                data: dataSetsData,
                parsing: {
                    yAxisKey: 'systolic'
                }
            }, {
                label: 'Diastolic',
                data: dataSetsData,
                parsing: {
                    yAxisKey: 'diastolic'
                }
            },]
        }

        const config = {
            type: "line",
            data: chartData
        }

        const chart = new Chart(
            document.getElementById("myChart"),
            config
        )
    }


})