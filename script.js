let array = [];
const size = 50;

function generateArray() {
    array = [];
    const container = document.getElementById("array");
    container.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 300) + 10;
        array.push(value);

        let bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await sleep(30);

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.background = "cyan";
            bars[j + 1].style.background = "cyan";
        }
    }
}

async function mergeSortStart() {
    await mergeSort(array, 0, array.length - 1);
}

async function mergeSort(arr, l, r) {
    if (l >= r) return;

    const m = Math.floor((l + r) / 2);

    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    let bars = document.getElementsByClassName("bar");

    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
        await sleep(50);

        if (left[i] <= right[j]) {
            arr[k] = left[i++];
        } else {
            arr[k] = right[j++];
        }

        bars[k].style.height = `${arr[k]}px`;
        bars[k].style.background = "yellow";
        k++;
    }

    while (i < left.length) {
        await sleep(50);
        arr[k] = left[i++];
        bars[k].style.height = `${arr[k]}px`;
        k++;
    }

    while (j < right.length) {
        await sleep(50);
        arr[k] = right[j++];
        bars[k].style.height = `${arr[k]}px`;
        k++;
    }
}

window.onload = generateArray;