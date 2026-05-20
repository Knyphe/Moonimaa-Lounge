import { registerSW } from 'virtual:pwa-register'
registerSW({
    immediate: true
})
const areas = document.querySelectorAll("rect");
const room = document.querySelector(".room");
const confirmpopup = document.querySelector(".confirmpopup");
const confirm = document.querySelector(".confirm");
const cancel = document.querySelector(".cancel");
const booking = document.querySelector(".setupbooking");
const occupy = document.querySelector(".occupy");
const dropdown = document.querySelector(".tokens");
const resorttoken = document.querySelector(".resorttoken");
const manualenter = document.querySelector(".manualenter");
var selectedSeat;
var menuOpen = false;
var bookingmenu = false;
const overlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const enter = document.querySelector(".enter");
var currentseat;
var count = 0;
const box = document.querySelector(".map-container");
const seats = document.querySelectorAll(".seats");
const exit = document.querySelector(".exit");
const book = document.querySelector(".book");
const free = document.querySelector(".free");
const unavail = document.querySelector(".unavail");
const info = document.querySelector(".info");
const infos = document.querySelectorAll(".info > p")
var booked = false;
var occupied = false;
const reset = document.querySelector(".reset");
const logviewer = document.querySelector(".fulllogs");
const sidebarmenu  = document.querySelector(".sidebarmenu");
var sidebarmenuopen = false;
const sidebarpopup = document.querySelector(".sidebarpopup");
const entrycontainer = document.querySelector(".entrycontainer");
var currentfunction = "";
const mapcontainer = document.querySelector(".map-container");
var logsopen = false;
var currentcode;
var bookedtime;
areas.forEach((area) => {
    console.log("ran");
    const button = document.createElement("button");
    const x = parseFloat(area.getAttribute("x"));
    const y = parseFloat(area.getAttribute("y"));
    const w = parseFloat(area.getAttribute("width"));
    const h = parseFloat(area.getAttribute("height"));
    button.classList.add("buttons");
    button.classList.add("seats");
    button.style.left = (x / 397.93332) * 100 + "%";
    button.style.top = (y / 310.62082) * 100 + "%";
    button.style.width = (w / 397.93332) * 100 + "%";
    button.style.height = (h / 310.62082) * 100 + "%";
    room.appendChild(button);
    button.dataset.id = count;
    count++;
});
const resortcodes = ['AYM', 'NHC', 'RMM', 'ROB', 'TRM', 'TRG', 'PMM', 'PHM', 'MMK', 'RHA', 'SSL', 'CRM', 'SPM', 'EQV', 'RCN', 'SWD', 'SJR', 'MRK', 'NOK', 'MNF', 'IRU', 'KMD', 'KRD', 'INH', 'FFR', 'HUW', 'KDF', 'BRK', 'BFT', 'EML', 'FRF', 'HBR', 'AAA', 'COR', 'VKK', 'FNU', 'SIM'];
resortcodes.sort();
resortcodes.forEach((code) => {
    const temp = document.createElement('div');
    temp.classList.add("token");
    temp.innerText = code;
    dropdown.appendChild(temp);
});
document.addEventListener("pointerup", (event) => {if(event.target.classList.contains("seats")){
        openMenu(event);
    }});
document.querySelector("svg").remove();
sidebarmenu.addEventListener("pointerup", () => {
    if(!menuOpen && !logsopen && !bookingmenu){
    overlay.style.display = "inline-block";
    sidebarmenuopen = true;
    sidebarpopup.style.display = "inline-block";
    document.body.style.overflow = "hidden";
    mapcontainer.style.overflow = "hidden";
    }
})
const logmenu = document.querySelector(".logmenu");
const entry = document.querySelector(".entry");
logviewer.addEventListener("pointerup", () => {
    logmenu.style.display = "flex";
    overlay.style.display = "inline-block";
    sidebarpopup.style.display = "none";
    sidebarmenuopen = false;
    logsopen = true;
    document.body.style.overflow = "hidden";
    viewLogs();
})
overlay.addEventListener("pointerup", () => {
    if(menuOpen){
        overlay.style.display = "none";
        popup.style.display = "none";
        document.body.style.overflow = "auto";
        menuOpen = false;
        occupy.style.display = "none";
        book.style.display = "none";
        unavail.style.display = "none";
        free.style.display = "none";
        info.style.display = "none";
        booked = false;
    }
    else if(bookingmenu){
        booking.style.display = "none";
        popup.style.display = "inline-block";
        menuOpen = true;
        bookingmenu = false;
        resorttoken.innerText = "---";
        manualenter.value = "";
    }
    else if(sidebarmenuopen){
        overlay.style.display = "none";
        sidebarmenuopen = false;
        sidebarpopup.style.display = "none";
        document.body.style.overflow = "auto";
    }
    else if(logsopen){
        overlay.style.display = "none";
        logsopen = false;
        logmenu.style.display = "none";
        document.body.style.overflow = "auto";
        entrycontainer.innerHTML = "";
    }
});

document.addEventListener("pointerup", (event) => {
    if(event.target.classList.contains("menubutton")){
        if(event.target.classList.contains("book")){
            booking.style.display = "inline-block";
            popup.style.display = "none";
            menuOpen = false;
            bookingmenu = true;
            currentfunction = "book";
        }
        else if(event.target.classList.contains("occupy") && !booked){
            booking.style.display = "inline-block";
            popup.style.display = "none";
            menuOpen = false;
            bookingmenu = true;
            currentfunction = "occupy";
        }
        else if(event.target.classList.contains("occupy") && booked){
            popup.style.display = "none";
            menuOpen = false;
            currentfunction = "occupy";
            confirmpopup.style.display = "flex";
        }
        else if(event.target.classList.contains("unavail")){
            confirmpopup.style.display = "flex";
            popup.style.display = "none";
            menuOpen = false;
            currentfunction = "unavail";
        }
        else if(event.target.classList.contains("free")) {
            confirmpopup.style.display = "flex";
            popup.style.display = "none";
            menuOpen = false;
            currentfunction = "free";
        }
        else if(event.target.classList.contains("logs")) {
            popup.style.display = "none";
            menuOpen = false;
            viewPartLogs(selectedSeat.dataset.id);
            logmenu.style.display = "flex";
            logsopen = true;
        }
        else {
        confirmpopup.style.display = "flex";
        popup.style.display = "none";
        menuOpen = false;
        }
    }
})
resorttoken.addEventListener("pointerup", () => {
    dropdown.style.display = "inline-block";
})
var selectedtoken;
document.addEventListener("pointerup", (event) => {
    if(event.target.classList.contains("token")){
        resorttoken.innerText = event.target.innerText;
        dropdown.style.display = "none";
    }
})
/*confirmpopup.style.display = "flex";
        popup.style.display = "none";
        menuOpen = false;*/
confirm.addEventListener("pointerup", () => {
    confirmpopup.style.display = "none";
    overlay.style.display = "none";
    if(currentfunction == "free"){
        freeSeat(selectedSeat.dataset.id)
        addLog(currentcode, bookedtime, selectedSeat.dataset.id);
    }
    else if (currentfunction == "unavail"){
        closeSeat(selectedSeat.dataset.id);
    }
    else if (currentfunction == "occupy"){
        const now = new Date();
        const datestring  = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
        bookToOccupySeat(selectedSeat.dataset.id, datestring);
        booked = false;
    }
    occupy.style.display = "none";
    book.style.display = "none";
    unavail.style.display = "none";
    free.style.display = "none";
    info.style.display = "none";
})
cancel.addEventListener("pointerup", () => {
    confirmpopup.style.display = "none";
    popup.style.display = "flex";
    menuOpen = true;
})
enter.addEventListener("pointerup", () => {
    if(resorttoken.innerText != "---" || manualenter.value != ''){
    console.log(resorttoken.innerText);
    console.log(manualenter.value);
    bookingmenu = false;
    overlay.style.display = "none";
    booking.style.display = "none";
    if(resorttoken != "---") selectedtoken = resorttoken.innerText;
    if(manualenter.value != '') selectedtoken = manualenter.value;
    console.log(selectedtoken);
    const now = new Date();
    const datestring  = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    console.log(datestring);
    if (currentfunction == "book") bookSeat(selectedSeat.dataset.id, selectedtoken, datestring);
    else if (currentfunction == "occupy") occupySeat(selectedSeat.dataset.id, selectedtoken, datestring);
    }
    occupy.style.display = "none";
    book.style.display = "none";
    unavail.style.display = "none";
    free.style.display = "none";
    info.style.display = "none";
})
const seatmap = {};
document.querySelectorAll(".seats").forEach((seat) => {
    seatmap[seat.dataset.id] = seat;
    console.log("stored");
});
import { getFirestore, collection, doc, addDoc, setDoc, updateDoc, onSnapshot, getDoc, getDocs, setIndexConfiguration, writeBatch, runTransaction} from "firebase/firestore";
import app from "../firebase.js";
const db = getFirestore(app);
reset.addEventListener("pointerup", () => {
    resetSeats();
    overlay.style.display = "none";
    sidebarmenuopen = false;
    sidebarpopup.style.display = "none";
    document.body.style.overflow = "auto";
});
async function bookSeat(seatId, code, time){
    const seatRef = doc(db, "seats", seatId,);
    await runTransaction(db, async (transaction) => {
        const seatDoc = await transaction.get(seatRef)
        if (seatDoc.data().reserved){
            throw "already reserved"
        }
        transaction.update(seatRef, {
            booked:true, 
            resortcode:code, 
            bookedtime:time
        })
    })
}
async function occupySeat(seatId, code, time){
    const seatRef = doc(db, "seats", seatId);
    await updateDoc(seatRef, {booked:false, occupied:true, resortcode:code, bookedtime:time});
}
async function bookToOccupySeat(seatId, time){
    const seatRef = doc(db, "seats", seatId);
    await updateDoc(seatRef, {booked:false, occupied:true, bookedtime:time});
}
async function closeSeat(seatId){
    const seatRef = doc(db, "seats", seatId);
    await updateDoc(seatRef, {occupied:false, booked:false, closed:true});
}
async function freeSeat(seatId){
    console.log(seatId);
    const seatRef = doc(db, "seats", seatId);
    await updateDoc(seatRef, {occupied:false, booked:false, closed:false, resortcode:"---", bookedtime:""});
}
async function resetSeats(){
    loadingscreen.style.display = "inline-block";
    for(const seat of Object.entries(seatmap)){
    const seatId = seat[0];
    await freeSeat(seatId);
    }
    const snapshot = await getDocs(collection(db, "logs"));
    const batch = writeBatch(db);
    snapshot.forEach((docItem) => {
        batch.delete(docItem.ref);
    });
    await batch.commit();
    loadingscreen.style.display = "none";
}
async function openMenu(event){
        selectedSeat = event.target;
        menuOpen = true;
        const seatSnap = await getSeats(selectedSeat.dataset.id);
        console.log(seatSnap);
        overlay.style.display = "inline-block";
        currentcode = seatSnap.resortcode;
        bookedtime = seatSnap.bookedtime;
        /*if(seatSnap.booked){
            occupy.style.display = "flex";
            free.style.display = "flex";
            info.style.display = "flex";
            infos[0].innerText = currentcode;
            infos[1].innerText = "Booked since:- " + seatSnap.bookedtime;
            booked = true;
        }
        else*/ if(seatSnap.occupied){
            free.style.display = "flex";
            info.style.display = "flex";
            infos[0].innerText = currentcode;
            infos[1].innerText = "Assigned since:- " + seatSnap.bookedtime;
            occupied = true;
        }
        /*else if (seatSnap.closed){
            free.style.display = "flex";
        }*/
        else{
            occupy.style.display = "flex";
            //book.style.display = "flex";
            //unavail.style.display = "flex";
        }
        popup.style.display = "inline-block";
        document.body.style.overflow = "hidden";
}
async function getSeats(seatId){
    const seatRef = doc(db, "seats", seatId);
    const seatSnap = await getDoc(seatRef);
    if(seatSnap.exists()){
        return seatSnap.data();
    } else {
        console.log("Seat does not exist");
        return null;
    }
}
/*
seats.forEach((seat, index) => {
    console.log("added");
    const seatId = `${seat.dataset.id}`;
    setDoc(doc(db, "seats", seatId), {
    booked: false, 
    occupied: false, 
    closed: false, 
    resortcode: "--",
    bookedtime: ""
    }, {merge: true});
})
*/
const loadingscreen = document.querySelector(".loadingscreen");
async function getLogs(){
    const snapshot = await getDocs(collection(db, "logs"));
    snapshot.forEach((doc) => {
        data.push({...doc.data()});
    });
}
onSnapshot(collection(db, "seats"), (snapshot) => {
    snapshot.docChanges().forEach(change => {
        const seatData = change.doc.data();

        const seatId = change.doc.id;
        const seatButton = seatmap[seatId];
        if(!seatButton) return;
        if(seatData.occupied){
            seatButton.style.backgroundColor = "rgb(128, 255, 128)";
            if(seatData.resortcode.length <= 3)
            seatButton.innerText = seatData.resortcode;
            else seatButton.innerText = seatData.resortcode.substring(0, 3) + "...";
        }
        else if(seatData.booked){
            seatButton.style.backgroundColor = "rgb(255, 247, 128)";
            if(seatData.resortcode.length <= 3)
            seatButton.innerText = seatData.resortcode;
            else seatButton.innerText = seatData.resortcode.substring(0, 3) + "...";
        }
        else if(seatData.closed){
            seatButton.style.backgroundColor = "rgb(255, 128, 153)";
        }
        else {
            seatButton.style.backgroundColor = "rgb(198, 211, 230)";
            seatButton.innerText = seatButton.dataset.id;
        }
    });
    loadingscreen.style.display = "none";
});
async function addLog(resort, time, seatCode){
    const now = new Date();
    const datestring  = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    await addDoc(collection(db, "logs"), {
        from: time,
        to: datestring,
        resort: resort,
        code: seatCode
    });
}
const data = [];
onSnapshot(collection(db, "logs"), (snapshot) => {
    snapshot.docChanges().forEach(change => {
        console.log(change.doc.data());
        data.push({...change.doc.data()});
    });
});

function viewLogs(){
    if(data.length == 0){
        const copy = entry.cloneNode(true);
        copy.style.display = "flex";
        const sections = copy.querySelectorAll("div");
        sections[1].innerText = "No logs available right now";
        entrycontainer.appendChild(copy);
        return;
    }
    data.forEach(dataset => {
        console.log(dataset);
        const copy = entry.cloneNode(true);
        copy.style.display = "flex";
        const sections = copy.querySelectorAll("div");

        sections[0].innerText = dataset.from;
        sections[1].innerText = dataset.to;
        sections[2].innerText = dataset.resort;
        entrycontainer.appendChild(copy);
    })
    return;
}
function viewPartLogs(code){
    if(data.length == 0){
        const copy = entry.cloneNode(true);
        copy.style.display = "flex";
        const sections = copy.querySelectorAll("div");
        sections[1].innerText = "No logs available right now";
        entrycontainer.appendChild(copy);
        return;
    }
    var hasLogs = false;
    data.forEach(dataset => {
        console.log(dataset);
        if(dataset.code == code){
        hasLogs = true;
        const copy = entry.cloneNode(true);
        copy.style.display = "flex";
        const sections = copy.querySelectorAll("div");
        sections[0].innerText = dataset.from;
        sections[1].innerText = dataset.to;
        sections[2].innerText = dataset.resort;
        entrycontainer.appendChild(copy);
        }
        if(!hasLogs) {
        const copy = entry.cloneNode(true);
        copy.style.display = "flex";
        const sections = copy.querySelectorAll("div");
        sections[1].innerText = "No logs available right now";
        entrycontainer.appendChild(copy);
        }
    })
    return;
}
