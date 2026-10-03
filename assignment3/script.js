const transactions = [
    { id: "TXN00001", customer: "Alice Johnson", amount: 1200.5, date: "2025-04-01", type: "credit" },
    { id: "TXN00002", customer: "Brian Lee", amount: 340.0, date: "2025-04-02", type: "debit" },
    { id: "TXN00003", customer: "Carla Mendes", amount: 875.25, date: "2025-03-28", type: "credit" },
    { id: "TXN00004", customer: "David Chen", amount: 50.0, date: "2025-04-03", type: "debit" },
    { id: "TXN00005", customer: "Elena Rossi", amount: 2100.0, date: "2025-03-30", type: "credit" },
    { id: "TXN00006", customer: "Farah Malik", amount: 645.8, date: "2025-04-05", type: "debit" },
    { id: "TXN00007", customer: "George Adams", amount: 99.99, date: "2025-04-04", type: "debit" },
    { id: "TXN00008", customer: "Hana Kim", amount: 1500.0, date: "2025-03-25", type: "credit" },
    { id: "TXN00009", customer: "Ivan Petrov", amount: 430.4, date: "2025-04-06", type: "debit" },
    { id: "TXN00010", customer: "Julia Santos", amount: 780.0, date: "2025-04-01", type: "credit" },
    { id: "TXN00011", customer: "Kevin Brown", amount: 260.75, date: "2025-03-29", type: "debit" },
    { id: "TXN00012", customer: "Lina Ortega", amount: 3200.0, date: "2025-04-07", type: "credit" },
    { id: "TXN00013", customer: "Marcus White", amount: 115.2, date: "2025-04-08", type: "debit" },
    { id: "TXN00014", customer: "Nina Patel", amount: 940.6, date: "2025-03-27", type: "credit" },
    { id: "TXN00015", customer: "Omar Haddad", amount: 75.0, date: "2025-04-09", type: "debit" },
    { id: "TXN00016", customer: "Priya Singh", amount: 1880.0, date: "2025-04-02", type: "credit" },
    { id: "TXN00017", customer: "Quinn Murphy", amount: 510.3, date: "2025-04-10", type: "debit" },
    { id: "TXN00018", customer: "Rita Gomez", amount: 1340.9, date: "2025-03-26", type: "credit" },
    { id: "TXN00019", customer: "Sam Wilson", amount: 220.0, date: "2025-04-11", type: "debit" },
    { id: "TXN00020", customer: "Tina Lopez", amount: 670.45, date: "2025-04-03", type: "credit" },
    { id: "TXN00021", customer: "Umar Khan", amount: 405.0, date: "2025-04-12", type: "debit" },
    { id: "TXN00022", customer: "Vera Novak", amount: 2500.0, date: "2025-03-31", type: "credit" },
    { id: "TXN00023", customer: "Will Foster", amount: 88.88, date: "2025-04-13", type: "debit" },
    { id: "TXN00024", customer: "Xena Park", amount: 1750.25, date: "2025-04-04", type: "credit" },
    { id: "TXN00025", customer: "Yuri Ivanov", amount: 300.0, date: "2025-04-14", type: "debit" }
];

let currentList = transactions.map((txn) => ({ ...txn }));
let lastSearchId = null;

function compareByField(a, b, field) {
    if (field === "amount") {
        return a.amount - b.amount;
    }
    if (field === "date") {
        return a.date.localeCompare(b.date);
    }
    return a.customer.toLowerCase().localeCompare(b.customer.toLowerCase());
}

function bubbleSort(list, field) {
    const arr = list.map((txn) => ({ ...txn }));
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (compareByField(arr[j], arr[j + 1], field) > 0) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function mergeSort(list, field) {
    const arr = list.map((txn) => ({ ...txn }));
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), field);
    const right = mergeSort(arr.slice(mid), field);
    return merge(left, right, field);
}

function merge(left, right, field) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (compareByField(left[i], right[j], field) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function linearSearchByCustomer(list, query) {
    const q = query.trim().toLowerCase();
    const matches = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].customer.toLowerCase().includes(q)) {
            matches.push(list[i]);
        }
    }
    return matches;
}

function compareByFieldForId(a, b) {
    return a.id.localeCompare(b.id);
}

function mergeSortById(list) {
    const arr = list.map((txn) => ({ ...txn }));
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortById(arr.slice(0, mid));
    const right = mergeSortById(arr.slice(mid));
    return mergeById(left, right);
}

function mergeById(left, right) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (compareByFieldForId(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function binarySearchById(list, query) {
    const sorted = mergeSortById(list);
    const target = query.trim().toUpperCase();
    let low = 0;
    let high = sorted.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midId = sorted[mid].id.toUpperCase();
        if (midId === target) {
            return sorted[mid];
        }
        if (midId < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return null;
}

function formatAmount(amount) {
    return amount.toFixed(2);
}

function renderTable(list) {
    const body = document.getElementById("transaction-body");
    body.innerHTML = list
        .map((txn) => {
            const highlight = lastSearchId && txn.id === lastSearchId ? ' class="search-hit"' : "";
            return `<tr${highlight}>
                <td>${txn.id}</td>
                <td>${txn.customer}</td>
                <td>${formatAmount(txn.amount)}</td>
                <td>${txn.date}</td>
                <td>${txn.type}</td>
            </tr>`;
        })
        .join("");
}

function renderSearchResult(items) {
    const box = document.getElementById("search-result");
    if (!items || items.length === 0) {
        box.innerHTML = '<p class="search-miss">not found</p>';
        lastSearchId = null;
        renderTable(currentList);
        return;
    }
    box.innerHTML = `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            ${items
                .map(
                    (txn) => `<tr>
                        <td>${txn.id}</td>
                        <td>${txn.customer}</td>
                        <td>${formatAmount(txn.amount)}</td>
                        <td>${txn.date}</td>
                        <td>${txn.type}</td>
                    </tr>`
                )
                .join("")}
        </tbody>
    </table>`;
    lastSearchId = items.length === 1 ? items[0].id : null;
    renderTable(currentList);
}

document.getElementById("sort-btn").addEventListener("click", () => {
    const algorithm = document.getElementById("sort-algorithm").value;
    const field = document.getElementById("sort-field").value;
    currentList = algorithm === "bubble" ? bubbleSort(currentList, field) : mergeSort(currentList, field);
    const info =
        algorithm === "bubble"
            ? "Bubble Sort: O(n^2) time, O(1) extra space (copy used here for safety)."
            : "Merge Sort: O(n log n) time, O(n) extra space.";
    document.getElementById("sort-info").textContent = `Sorted by ${field} using ${algorithm} sort. ${info}`;
    renderTable(currentList);
});

document.getElementById("search-btn").addEventListener("click", () => {
    const type = document.getElementById("search-type").value;
    const query = document.getElementById("search-query").value;
    if (!query.trim()) {
        document.getElementById("search-info").textContent = "Enter a search query.";
        renderSearchResult([]);
        return;
    }
    if (type === "linear") {
        const matches = linearSearchByCustomer(currentList, query);
        document.getElementById("search-info").textContent =
            `Linear Search by customer (O(n) time). Found ${matches.length} match(es).`;
        renderSearchResult(matches);
    } else {
        const match = binarySearchById(currentList, query);
        document.getElementById("search-info").textContent =
            "Binary Search by id. Array is sorted by id first. O(log n) search after O(n log n) sort.";
        renderSearchResult(match ? [match] : []);
    }
});

renderTable(currentList);
