"use client";

import Navbar from "../components/navbar";
import Link from "next/link";
import { BsTruck, BsTools } from "react-icons/bs";
import { MdRvHookup } from "react-icons/md";
import { RxCube } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import SectionCardNusantara from "../components/sectionCardNusantara";
import NusantaraNav from "../components/dropDownmenu";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Layanan" },
  { href: "#about", label: "Tentang" },
  { href: "#dishub", label: "Kegiatan" },
  { href: "#pool", label: "Pool" },
  { href: "#bengkel", label: "Bengkel" },
  { href: "#partnership", label: "Partner" },
  { href: "#contact", label: "Kontak" },
];

const NusantaraPage = () => {
  // const swiper = useSwiper();

  return (
    <div>
      <div className="min-h-screen flex flex-col dark:bg-brandColor-backgroundColor font-productSans">
        <Navbar title="Nusantara Trans Sentosa"></Navbar>
        <NusantaraNav links={links}></NusantaraNav>
        <SectionCardNusantara
          idSection="home"
          content={
            <div className="flex justify-center flex-col items-center gap-4 py-3">
              <h1 className="text-2xl font-semibold dark:text-white px-5 sm:text-center">
                Kami Berpengalaman dalam Pendistribusian Barang, dengan Cepat &
                Tepat
              </h1>
              <div className="grid grid-cols-2 sm:flex">
                <div></div>
                <Link
                  href="/nusantaratrans/#contact"
                  className="bg-brandColor-darkenBlue border-2 rounded-xl
            border-brandColor-darkenBlue text-white py-3 px-5
            hover:bg-white hover:text-brandColor-darkenBlue 
            dark:bg-brandColor-darkenRed dark:border-brandColor-darkenRed 
            dark:text-brandColor-backgroundColor hover:dark:bg-transparent hover:dark:text-brandColor-darkenRed
            transition duration-300 ease-in-out"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="services"
          content={
            // <div className="container mx-auto my-2">
            //   <div className="grid grid-cols-1 gap-4 mb-5 px-5 dark:text-white">
            //     <TwoColumnNusantara
            //       column1title=""
            //       column2title=""
            //       column1content={
            //         <div
            //         //     className="backdrop-blur-md bg-gradient-to-r from-brandColor-gradationBlue to-transparent text-black
            //         //  dark:text-white dark:to-brandColor-backgroundColor px-3 py-3 rounded-md"
            //         >
            //           <BsTruck className="text-8xl"></BsTruck>
            //           <h2 className="text-3xl font-bold">Trucking</h2>
            //           <p className="text-xl">
            //             Layanan pengangkutan barang menggunakan berbagai jenis
            //             Truk, mulai dari CDD Standard, CDD Long, Fuso dan Wingbox.
            //           </p>
            //         </div>
            //       }
            //       column2content={
            //         <div
            //         //     className="backdrop-blur-md bg-gradient-to-r from-brandColor-gradationBlue to-transparent text-black
            //         //  dark:text-white dark:to-brandColor-backgroundColor px-3 py-3 rounded-md"
            //         >
            //           <MdRvHookup className="text-8xl"></MdRvHookup>
            //           <h2 className="text-3xl font-bold">Heavy Cargo</h2>
            //           <p className="text-xl">
            //             Layanan pengangkutan barang - barang berat atau besar
            //             mulai dari mesin industri, alat berat menggunakan
            //             kendaraan khusus seperti trailer, highbed, lowbed dan
            //             lainnya.
            //           </p>
            //         </div>
            //       }
            //     ></TwoColumnNusantara>
            //     <TwoColumnNusantara
            //       column1title=""
            //       column2title=""
            //       column1content={
            //         <div
            //         //       className="backdrop-blur-md bg-gradient-to-r from-brandColor-gradationBlue to-transparent text-black
            //         //  dark:text-white dark:to-brandColor-backgroundColor px-3 py-3 rounded-md"
            //         >
            //           <BsTools className="text-8xl"></BsTools>
            //           <h2 className="text-3xl font-bold">Manajemen Service</h2>
            //           <p className="text-xl">
            //             -Fleet Service Kendaraan <br />
            //             -Monitoring dan Pengurusan Surat Kendaraan <br />
            //             -Handling Kecelakaan <br />
            //             -Service Berat <br />
            //             -Service Reguler <br />
            //             -On the Spot Service
            //           </p>
            //         </div>
            //       }
            //       column2content={
            //         <div
            //         //     className="backdrop-blur-md bg-gradient-to-r from-brandColor-gradationBlue to-transparent text-black
            //         //  dark:text-white dark:to-brandColor-backgroundColor px-3 py-3 rounded-md"
            //         >
            //           <RxCube className="text-8xl"></RxCube>
            //           <h2 className="text-3xl font-bold">Fasilitas</h2>
            //           <p className="text-xl">
            //             -Gratis Pickup <br />
            //             -Door to Door Service <br />
            //             -Jaminan Asuransi (By Request) <br />
            //             -Packing Profesional (By Request) <br />
            //             -Dedicated Customer Service (Corporate) <br />
            //             -SDM Berkualitas <br />
            //             -Biaya Pengiriman Terjangkau <br />
            //             -Service perbaikan dilokasi customer / storing <br />
            //             -Penyediaan Unit pengganti dalam waktu 45 Menit apabila
            //             terdapat kendala pada pengiriman
            //           </p>
            //         </div>
            //       }
            //     ></TwoColumnNusantara>
            //   </div>
            // </div>
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 mt-5">
              <h1 className="text-2xl font-bold md:text-3xl dark:text-white text-center">
                Layanan Kami
              </h1>
              <div className="px-5 mb-2">
                <Swiper
                  // install Swiper modules
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  className="pb-3"
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                >
                  <SwiperSlide>
                    <div className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6 pb-3">
                      <BsTruck className="text-8xl"></BsTruck>
                      <h2 className="text-3xl font-bold">Trucking</h2>
                      <p className="text-xl">
                        Layanan pengangkutan barang menggunakan berbagai jenis
                        Truk, mulai dari CDD Standard, CDD Long, Fuso dan
                        Wingbox.
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6 pb-3">
                      <MdRvHookup className="text-8xl"></MdRvHookup>
                      <h2 className="text-3xl font-bold">Heavy Cargo</h2>
                      <p className="text-xl">
                        Layanan pengangkutan barang - barang berat atau besar
                        mulai dari mesin industri, alat berat menggunakan
                        kendaraan khusus seperti trailer, highbed, lowbed dan
                        lainnya.
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6 pb-3">
                      <BsTools className="text-8xl"></BsTools>
                      <h2 className="text-3xl font-bold">Manajemen Service</h2>
                      <p className="text-xl">
                        -Fleet Service Kendaraan <br />
                        -Monitoring dan Pengurusan Surat Kendaraan <br />
                        -Handling Kecelakaan <br />
                        -Service Berat <br />
                        -Service Reguler <br />
                        -On the Spot Service
                      </p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6 pb-3">
                      <RxCube className="text-8xl"></RxCube>
                      <h2 className="text-3xl font-bold">Fasilitas</h2>
                      <p className="text-lg">
                        -Biaya Pengiriman Terjangkau <br />
                        -Gratis Pickup <br />
                        -Door to Door Service <br />
                        -Jaminan Asuransi (By Request) <br />
                        -Packing Profesional (By Request) <br />
                        -Dedicated Customer Service (Corporate), dan masih
                        banyak lagi
                        <br />
                        {/* -SDM Berkualitas <br /> */}
                        {/* -Service perbaikan dilokasi customer / storing <br />
                    -Penyediaan Unit pengganti dalam waktu 45 Menit apabila
                    terdapat kendala pada pengiriman */}
                      </p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="about"
          content={
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 text-black dark:text-white">
              <div className="px-5 py-3 flex-col">
                <div>
                  <h1 className="text-xl md:text-3xl font-bold mb-3 text-center ">
                    Selamat datang di PT Nusantara Trans Sentosa - Solusi
                    Logistik Terpercaya di Surabaya!
                  </h1>
                  <p className="text-lg text-justify">
                    Kami adalah Perusahaan logistik PT. Nusantara Trans Sentosa
                    yang didirikan pada tahun 2022 dan berkantor pusat di
                    Surabaya. PT Nusantara Trans Sentosa didirikan oleh pendiri
                    CV Nusantara Trans yang sudah berdiri sejak tahun 2013
                    sampai dengan saat ini, untuk memenuhi segmentasi distribusi
                    barang kiriman yang lebih luas dengan berbagai layanan yang
                    komprehensif. Dengan tim logistik yang berpengalaman,
                    perusahaan kami telah memperluas armada truk untuk mencapai
                    lebih banyak wilayah di Indonesia, didorong oleh kepercayaan
                    klien yang meningkat. Kami menyediakan layanan pengiriman
                    untuk barang kiriman, kendaraan, dan alat berat ke berbagai
                    daerah di Kalimantan, Sulawesi, Sumatera, NTT, dan NTB.
                    Selain itu, kami juga menyewakan truk untuk pengiriman
                    barang di wilayah Jawa-Bali. PT Nusantara Trans Sentosa
                    bertujuan untuk menjadi pemain utama dalam industri
                    logistik, dengan menjamin distribusi barang yang efisien dan
                    dapat diandalkan.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                  <div>
                    <h2 className="text-xl md:text-2xl text-center font-bold">
                      Visi
                    </h2>
                    <p className="text-lg text-justify">
                      Menjadi perusahaan Trucking terkemuka di industri dengan
                      memberikan layanan berkualitas tinggi dan inovatif untuk
                      memenuhi kebutuhan pelanggan kami.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl text-center font-bold">
                      Misi
                    </h2>
                    <p className="text-lg">
                      -Memberikan layanan pengiriman yang aman, tepat waktu, dan
                      efisien. <br />
                      -Menjaga standar kualitas yang tinggi melalui pelatihan
                      kontinu dan pengembangan sumber daya. <br />
                      -Membangun hubungan jangka panjang dengan pelanggan kami
                      melalui komunikasi yang efektif dan dukungan yang tulus.{" "}
                      <br />
                      -Mengembangkan teknlogi dan inovasi untuk meningkatkan
                      efisiensi operasional dan mengurangi dampak lingkungan.{" "}
                      <br />
                      -Mengoptimalkan keuntungan perusahaan dengan cara yang
                      etis dan profesional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="dishub"
          content={
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 mt-5">
              <h1 className="text-xl md:text-3xl font-bold px-5 text-center text-black dark:text-white mt-3 mb-3">
                Sosialisasi Sistem Manajemen Keselamatan oleh DISHUB Kota
                Surabaya
              </h1>
              <div className="grid grid-cols-1 gap-2 mb-5 px-5 dark:text-white mt-5">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  slidesPerView={1}
                  spaceBetween={60}
                  className="w-full h-auto"
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                >
                  <SwiperSlide className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6">
                    <Image
                      alt="foto 1"
                      src="https://nusantaratranssentosa.co.id/css/img/foto1.jpg"
                      width={640}
                      height={360}
                      className="rounded-md"
                    ></Image>
                  </SwiperSlide>
                  <SwiperSlide className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6">
                    <Image
                      alt="foto 2"
                      src="https://nusantaratranssentosa.co.id/css/img/foto2.jpg"
                      width={640}
                      height={360}
                      className="rounded-md"
                    ></Image>
                  </SwiperSlide>
                  <SwiperSlide className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6">
                    <Image
                      alt="foto 3"
                      src="https://nusantaratranssentosa.co.id/css/img/foto3.jpg"
                      width={640}
                      height={360}
                      className="rounded-md"
                    ></Image>
                  </SwiperSlide>
                  <SwiperSlide className="bg-gradient-to-bl from-brandColor-darkenBlue to-brandColor-darkenRed rounded-lg p-6">
                    <Image
                      alt="foto 4"
                      src="https://nusantaratranssentosa.co.id/css/img/foto4.jpg"
                      width={640}
                      height={360}
                      className="rounded-md"
                    ></Image>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="pool"
          content={
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 mt-5 dark:text-white">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Pool Kami
              </h1>
              <div className="w-full h-auto">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  slidesPerView={1}
                  // spaceBetween={20}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                >
                  <SwiperSlide>
                    <div className="px-5 rounded-lg">
                      <Image
                        src="https://nusantaratranssentosa.co.id/css/img/surabaya.jpg"
                        alt="surabaya"
                        width={800}
                        height={360}
                        className="rounded-lg"
                      ></Image>
                      <h3>Pool Surabaya</h3>
                      <p>
                        Alamat: Jl. Raya Juanda Semambung Kec.Gedangan Sidoarjo
                        - Jawa Timur
                      </p>
                      <p>Luas Pool : 21Mx32M / 672M ²</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="px-5 rounded-lg">
                      <Image
                        src="https://nusantaratranssentosa.co.id/css/img/madiun.jpg"
                        alt="madiun"
                        width={800}
                        height={360}
                        className="rounded-lg"
                      ></Image>
                      <h3>Pool Madiun</h3>
                      <p>
                        Alamat : Jl. Jend. Sudirman Dusun 1 Pagota Kec. Geger
                        Kab. Madiun Jawa Timur
                      </p>
                      <p>Luas Pool : 17Mx28M / 476M ²</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="px-5 rounded-lg">
                      <Image
                        src="https://nusantaratranssentosa.co.id/css/img/malang.jpg"
                        alt="malang"
                        width={800}
                        height={360}
                        className="rounded-lg"
                      ></Image>
                      <h3>Pool Malang</h3>
                      <p>
                        Alamat : Jl.Raya Pakisjajar No.3 Trajem Pakisjajar
                        Kec.Pakis Kab.Malang – Jawa Timur
                      </p>
                      <p>Luas Pool : 23Mx17M / 391M ²</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="px-5 rounded-lg">
                      <Image
                        src="https://nusantaratranssentosa.co.id/css/img/kediri.jpg"
                        alt="kediri"
                        width={800}
                        height={360}
                        className="rounded-lg"
                      ></Image>
                      <h3>Pool Kediri</h3>
                      <p>
                        Alamat : Jl.Mataram No.2 Karangrejo Kec.Ngasem, Kab.
                        Kediri – Jawa Timur
                      </p>
                      <p>Luas Pool : 18Mx32M / 576M ²</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="rounded-lg px-5">
                      <Image
                        src="https://nusantaratranssentosa.co.id/css/img/jember.jpg?v=1"
                        alt="jember"
                        width={800}
                        height={360}
                        className="rounded-lg"
                      ></Image>
                      <h3>Pool Jember</h3>
                      <p>
                        Alamat : Jl. Basuki rahmat Gg.SMP 8 No.6 Jember Jawa
                        Timur
                      </p>
                      <p>Luas Pool : 25Mx35M / 875M ²</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="rounded-lg px-5">
                      <Image
                        src="https://nusantaratranssentosa.co.id/css/img/jatiasih.jpg"
                        alt="jatiasih"
                        width={800}
                        height={360}
                        className="rounded-lg"
                      ></Image>
                      <h3>Pool Jatiasih</h3>
                      <p>
                        Alamat : Jl.Wibawa Mukti II No.15 Jatisari, Kec.Jatiasih
                        Kota Bekasi - Jawa Barat
                      </p>
                      <p>Luas Pool : 20Mx40M / 800M ²</p>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="bengkel"
          content={
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 mt-5 dark:text-white">
              <h1 className="text-xl md:text-3xl font-bold text-center mb-3">
                Bengkel Rekanan Resmi
              </h1>
              <div className="grid grid-cols-1 md:grid-cols 3">
                <div className="px-5">
                  <h3 className="text-xl md:text-3xl font-bold my-3">
                    Area Surabaya{" "}
                  </h3>
                  <br />
                  <p>Service Car PT. Nusantara Trans Sentosa </p>
                  Alamat : Jl. Raya Juanda Semambung, Kec.Gedangan <br />
                  Kab.Sidoarjo – Jawa Timur. <br />
                  <p>
                    Pic: Bpk Nofi, Telp:{" "}
                    <a
                      href="https://wa.me/+6287851955986"
                      target="_blank"
                      className="underline text-blue-400 hover:no-underline hover:text-black hover:dark:text-white"
                    >
                      0878-5195-5986
                    </a>
                  </p>
                  <br />
                  <p>ASCO ISUZU NGINDEN</p>
                  <p>Alamat : Jl. Raya Nginden No. 72 – 74, B</p>
                </div>
                <div className="px-5">
                  <h3 className="text-xl md:text-3xl font-bold my-3">
                    Area Jember
                  </h3>
                  <br />
                  <p>ASCO JEMBER</p>
                  Alamat : Jl. Hayam wuruk No. 161, Kaliwates, Jember
                  <br />
                  Pic. Bpk. Deon
                  <br /> Tlp. 0331 – 423666
                  <br />
                  <br />
                  <p>BENGKEL PURNOMO JEMBER</p>
                  Alamat : Jl.Basuki Rahmat Gg SMP 8 No.6 ,Jember
                  <br />
                  Pic: Ibu Wulan, Telp: 0851-0078-7747
                </div>
                <div className="px-5">
                  <h3 className="font-bold text-xl md:text-3xl my-3">
                    Area Banyuwangi
                  </h3>
                  <br />
                  ASCO BANYUWANGI
                  <br />
                  Alamat : Jl. Letjen S parman No. 08, Sumber rejo, Banyuwangi
                  <br />
                  Pic: Bpk.Zaenal, Telp: 0852-3053-3257
                </div>
                <div className="px-5">
                  <h3 className="font-bold text-xl md:text-3xl my-3">
                    Area Kediri
                  </h3>
                  <br />
                  ISUZU KEDIRI (JOLO)
                  <br />
                  Alamat : Jl. Erlaga 48, Kediri - Jawa Timur
                  <br />
                  Pic: Bpk.Bayu, Telp: 0857-7063-47771
                  <br />
                  <br />
                  MITSUBISHI SUN STAR MOTOR KEDIRI
                  <br />
                  Alamat : Jl.Semeru KAV II – IV Mojoroto, Kediri – Jawa Timur
                  <br />
                  Pic: Eko Purnomo, Telp: 0813-3264-7875
                </div>
                <div className="px-5">
                  <h3 className="font-bold text-xl md:text-3xl my-3">
                    Area Madiun
                  </h3>
                  <br />
                  ISUZU MADIUN
                  <br />
                  Alamat: Jl. Urip Sumoharjo 13 Kota Madiun Jawa Timur
                  <br />
                  Pic: Bpk. Heru, Telp: 0812-3392-2232
                  <br />
                  <br />
                  MITSUBISHI DIPO MADIUN
                  <br />
                  Alamat : Jl. Jendral Urip Sumoharjo No.68 Kota Madiun
                  <br />
                  Pic: Bpk. AAY, Telp: 0812-3233-35373
                </div>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="partnership"
          content={
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 mt-5 dark:text-white">
              <h1 className="text-xl md:text-3xl font-bold text-center">
                Partner Kami
              </h1>
              <div className="flex px-5 gap-2">
                <div className="flex-col">
                  <Image
                    className="w-full h-auto"
                    alt="mayora"
                    src="https://nusantaratranssentosa.co.id/css/img/mayora.png?v=1"
                    width={512}
                    height={487}
                  ></Image>
                  <Image
                    className="w-full h-auto"
                    alt="tanaga"
                    src="https://nusantaratranssentosa.co.id/css/img/tanaga.png"
                    width={512}
                    height={487}
                  ></Image>
                  <Image
                    className="w-full h-auto"
                    alt="jnt"
                    src="https://nusantaratranssentosa.co.id/css/img/jnt.png"
                    width={512}
                    height={487}
                  ></Image>
                </div>
                <div className="flex-col gap-3">
                  <Image
                    className="w-72 h-auto"
                    alt="benteng"
                    src="https://nusantaratranssentosa.co.id/css/img/benteng.png"
                    width={512}
                    height={487}
                  ></Image>
                  <Image
                    className="w-72 h-auto"
                    alt="siantar"
                    src="https://nusantaratranssentosa.co.id/css/img/siantar.png"
                    width={512}
                    height={487}
                  ></Image>
                  <Image
                    className="w-72 h-auto"
                    alt="otgroup"
                    src="https://nusantaratranssentosa.co.id/css/img/otgroup-removebg-preview.png"
                    width={512}
                    height={487}
                  ></Image>
                </div>
              </div>
            </div>
          }
        ></SectionCardNusantara>
        <SectionCardNusantara
          idSection="contact"
          content={
            <div className="container max-w-full md:max-w-3xl w-full mx-auto my-2 backdrop-blur-xl rounded-md gap-3 mt-5">
              <h1 className="text-center text-xl md:text-3xl font-bold mb-4 dark:text-white">
                Hubungi Kami
              </h1>
              <div className="flex flex-col justify-center items-center gap-y-3 px-5">
                <a
                  target="_blank"
                  href="https://wa.me/+6285704085367"
                  className="w-full p-4 border-2 bg-brandColor-darkenBlue border-brandColor-darkenBlue text-white dark:text-brandColor-backgroundColor
           hover:bg-transparent hover:text-brandColor-darkenBlue rounded-lg dark:bg-brandColor-darkenRed
           dark:border-brandColor-darkenRed dark:hover:text-brandColor-darkenRed dark:hover:bg-transparent"
                >
                  <div className="flex justify-center items-center">
                    <FaWhatsapp className="text-2xl font-bold"></FaWhatsapp>
                    <p className="text-xl pl-2">0857-0408-5367</p>
                  </div>
                </a>
                <a
                  href="https://mail.google.com/mail/u/0/?fs=1&to=ptnusantaratransgmail.com&su=SUBJECT&body=BODY&bcc=ptnusantaratransgmail.com&tf=cm"
                  target="_blank"
                  className="w-full p-6 border bg-brandColor-darkenBlue border-brandColor-darkenBlue text-white dark:text-brandColor-backgroundColor
           hover:bg-transparent hover:text-brandColor-darkenBlue rounded-lg dark:bg-brandColor-darkenRed
           dark:border-brandColor-darkenRed dark:hover:text-brandColor-darkenRed dark:hover:bg-transparent"
                >
                  <div className="flex justify-center items-center gap-2">
                    <SiGmail className="text-2xl font-bold"></SiGmail>
                    <p className="text-xl pl-2">ptnusantaratrans@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://mail.google.com/mail/u/0/?fs=1&to=mail@nusantaratranssentosa.co.id&su=SUBJECT&body=BODY&bcc=mail@nusantaratranssentosa.co.id&tf=cm"
                  target="_blank"
                  className="w-full p-6 border bg-brandColor-darkenBlue border-brandColor-darkenBlue text-white dark:text-brandColor-backgroundColor
           hover:bg-transparent hover:text-brandColor-darkenBlue rounded-lg dark:bg-brandColor-darkenRed
           dark:border-brandColor-darkenRed dark:hover:text-brandColor-darkenRed dark:hover:bg-transparent"
                >
                  <div className="flex justify-center items-center gap-2">
                    <SiGmail className="text-2xl font-bold"></SiGmail>
                    <p className="text-xl pl-2">
                      mail@nusantaratranssentosa.co.id
                    </p>
                  </div>
                </a>
              </div>
            </div>
          }
        />
      </div>
      <footer className="flex flex-col items-center justify-center text-slate-500 bg-black">
        <div className="text-center text-md md:text-xl text-slate-500">
          Copyright © 2023 PT Nusantara Trans Sentosa. All rights reserved.
        </div>
        <div className="text-center text-md md:text-xl">
          Developed by{" "}
          <a
            href="https://github.com/dionsubaktiar"
            className="hover:text-white underline hover:no-underline"
          >
            Dion subaktiar
          </a>
        </div>
      </footer>
    </div>
  );
};

export default NusantaraPage;
