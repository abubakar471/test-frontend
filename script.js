
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

    if (response) {
        // setting patients list
        let patientsCardsContainer = document.getElementById("patients-cards-container");

        const patientsList = response.map((item, index) => {
            const div = document.createElement('div');

            if (item?.name === 'Jessica Taylor') {
                div.innerHTML = `<div class="patient-card bg-[#D8FCF7] py-4 hover:cursor-pointer">
                        <div class="patient-card-container flex items-center justify-between px-6 bg-[#D8FCF7]">
                            <div class="flex items-center gap-x-3 gap-y-2 bg-[#D8FCF7]">
                                <img src="${item?.profile_picture}" alt="${item?.name}"
                                    class="w-[48px] h-[48px] object-cover bg-[#D8FCF7]">

                                <div class="flex flex-col gap-y-0 bg-[#D8FCF7]">
                                    <span class="text-[#072635] font-bold bg-[#D8FCF7]">${item?.name}</span>
                                    <span class="text-[#707070] bg-[#D8FCF7]">${item?.gender}, ${item?.age}</span>
                                </div>
                            </div>

                            <button class="border-none outline-none rotate-[90deg] px-4">
                                <img src="./public/assets/images/nav_more.svg" alt="more" class="">
                            </button>
                        </div>
                    </div> `
            } else {
                div.innerHTML = `  <div class="patient-card bg-white py-4 hover:cursor-pointer static">
                <div class="patient-card-container bg-white flex items-center justify-between px-6">
                    <div class="flex items-center gap-x-3 gap-y-2 bg-white">
                        <img src="${item?.profile_picture}" alt="${item?.name}"
                            class="w-[48px] h-[48px] object-cover bg-white">

                        <div class="flex flex-col gap-y-0 bg-white">
                            <span class="text-[#072635] font-bold bg-white">${item?.name}</span>
                            <span class="text-[#707070] bg-white">${item?.gender}, ${item?.age}</span>
                        </div>
                    </div>

                    <button class="border-none outline-none rotate-[90deg] px-4">
                         <img src="./public/assets/images/nav_more.svg" alt="more" class="">
                    </button>
                </div>
            </div>`;
            }



            return div;
        })

        if (patientsList) {
            patientsCardsContainer.append(...patientsList);
        }

    }

    if (data) {
        // set name
        document.getElementById('selected-patient-info').innerHTML = `<img src="${data?.profile_picture}" alt="Jessica Taylor"
                            class="bg-white w-[200px] h-[200px] object-contain">
                        <span class="text-[072635] text-[24px] font-bold bg-white text-center" id="patient-name">${data?.name}</span>`

        // set date of birth
        let date_dob = new Date(data?.date_of_birth);

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
            div.classList.add('lab-results-card', 'flex', 'items-center', 'justify-between', 'px-6', 'py-4', 'mx-0', 'rounded-lg', 'group', 'bg-white', 'hover:bg-[#F6F7F8]', 'transition-all', 'duration-300', 'ease-in-out', 'cursor-pointer');
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

        let dataSetsDataBloodPressure = [];
        data?.diagnosis_history?.map((item, index) => {
            if (item?.year === 2023 || item?.year === 2024) {
                dataSetsDataBloodPressure.unshift(item)
            }
        })


        let dataSetsData = [];

        dataSetsDataBloodPressure.slice(9)?.map((item) => {
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