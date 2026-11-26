"use client";

import Image from "next/image";

interface ClientItem {
  name: string;
  logo: string;
  description: string;
}

const clients: ClientItem[] = [
  {
    name: "PT. Besmart Global Indonesia",
    logo: "/assets/images/besmart.png",
    description: "Enterprise software services & microservice solutions provider"
  },
  {
    name: "PT Nusantara Trans Sentosa",
    logo: "/assets/images/nts.png",
    description: "Corporate transport logistics & bulk freight network provider"
  },
  {
    name: "PT Lynthaz Tiga Jaya",
    logo: "/assets/images/lynthaz.png",
    description: "Heavy cargo transportation & logistics operations company"
  },
  {
    name: "PT Rins Global Logistics",
    logo: "/assets/images/rgl.png",
    description: "Door-to-door domestic shipment & freight forwarding network"
  }
];

const ClientsSection = () => {
  return (
    <section id="clients" className="py-20 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50">
            Trusted Clients & Partners
          </h2>
          <div className="w-12 h-px bg-stone-300 dark:bg-stone-700 mx-auto"></div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/10 flex flex-col items-center justify-between gap-4 text-center hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              {/* Logo Frame */}
              <div className="relative w-24 h-24 flex items-center justify-center bg-stone-50 dark:bg-stone-800/20 rounded-xl p-2 w-full">
                <div className="relative w-full h-full">
                  <Image
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="filter dark:brightness-95 contrast-100"
                  />
                </div>
              </div>

              {/* Client Info */}
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200 line-clamp-1">
                  {client.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-500 leading-snug line-clamp-2">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
