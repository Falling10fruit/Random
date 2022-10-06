var Kumpulkan = document.getElementById("Kumpulkan");
var NamaBaru = document.getElementById("NamaBaru");
var StokBaru = document.getElementById("StokBaru");
var HargaTokoBaru = document.getElementById("HargaTokoBaru");
var HargaEcerBaru = document.getElementById("HargaEcerBaru");
var Tambah = document.getElementById("Tambah");
var Receipt = document.getElementById("Receipt");
var Produkt = [{
    Nama: "Doll",
    Stok: 666,
    HargaToko: 75000,
    HargaEcer: 100000
}];

Kumpulkan.addEventListener("click", function () {
    if (NamaBaru.value == "" || NamaBaru.value == null) {
        document.getElementById("NamaHilang").innerHTML = "<strong>Mohon tambahkan nama</strong>";
        return;
    } else if (StokBaru.value == "" || StokBaru.value == null) {
        document.getElementById("NamaHilang").innerHTML = "";
        document.getElementById("StokHilang").innerHTML = "<strong>Mohon tambahkan stok</strong>";
        return;
    } else if (HargaTokoBaru.value == "" || HargaTokoBaru.value == null) {
        document.getElementById("StokHilang").innerHTML = "";
        document.getElementById("HargaTokoHilang").innerHTML = "<strong>Mohon tambahkan harga toko</strong>";
    } else if (HargaEcerBaru.value == "" || HargaEcerBaru.value == null) {
        document.getElementById("HargaTokoHilang").innerHTML = "";
        document.getElementById("HargaEcerHilang").innerHTML = "<strong>Mohon tambahkan harga ecer</strong>";
    } else {
        document.getElementById("HargaEcerHilang").innerHTML = "";
        Produkt.push({
            Nama: NamaBaru.value,
            Stok: parseInt(StokBaru.value),
            HargaToko: parseInt(HargaTokoBaru.value),
            HargaEcer: parseInt(HargaEcerBaru.value)
        });
        
        NamaBaru.value = "";
        StokBaru.value = "";
        HargaTokoBaru.value = "";
        HargaEcerBaru.value = "";
    }
});

Tambah.addEventListener("click", function () {
    var ProductSection = document.createElement("div");
    var ProductName = document.createElement("input");
    ProductName.setAttribute("type", "text");
    if (Produkt.length > 0) {
        ProductName.value = Produkt[0].Nama;
    }
    ProductSection.appendChild(ProductName);
    Receipt.appendChild(ProductSection);
});