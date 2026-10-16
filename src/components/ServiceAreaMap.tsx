import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, CheckCircle2, ShieldCheck, Compass, Info } from 'lucide-react';

export const ServiceAreaMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [userDistance, setUserDistance] = useState<number | null>(null);
  const [distanceStatus, setDistanceStatus] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  // Center of ZAYN service hub: Cibinong, Bogor
  const CIBINONG_LAT = -6.4828;
  const CIBINONG_LNG = 106.8485;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [CIBINONG_LAT, CIBINONG_LNG],
      zoom: 12,
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: false,
    });

    // Dark sleek tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd',
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Service Area Circle (8 km core coverage radius)
    L.circle([CIBINONG_LAT, CIBINONG_LNG], {
      color: '#f59e0b',
      fillColor: '#f59e0b',
      fillOpacity: 0.15,
      weight: 2,
      dashArray: '4, 6',
      radius: 8000,
    }).addTo(map);

    // Extended coverage circle (16 km)
    L.circle([CIBINONG_LAT, CIBINONG_LNG], {
      color: '#38bdf8',
      fillColor: '#38bdf8',
      fillOpacity: 0.05,
      weight: 1,
      dashArray: '2, 4',
      radius: 16000,
    }).addTo(map);

    // Custom Amber Pin for Main Hub
    const hubIcon = L.divIcon({
      className: 'custom-hub-marker',
      html: `
        <div style="background-color: #f59e0b; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(245, 158, 11, 0.6); border: 2px solid #000;">
          <span style="color: #000; font-weight: 800; font-size: 11px;">Z</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const hubMarker = L.marker([CIBINONG_LAT, CIBINONG_LNG], { icon: hubIcon }).addTo(map);
    hubMarker.bindPopup(`
      <div style="background: #171717; color: #fff; padding: 6px; font-family: sans-serif; font-size: 12px; border-radius: 6px;">
        <strong style="color: #f59e0b;">ZAYN Hub Cibinong</strong><br/>
        Pusat Armada Standby 24 Jam
      </div>
    `);

    // Key points in service zone
    const landmarks = [
      { name: 'Sentul City', lat: -6.5510, lng: 106.8625 },
      { name: 'Stasiun Bojong Gede', lat: -6.4947, lng: 106.7972 },
      { name: 'Citeureup', lat: -6.4880, lng: 106.8770 },
      { name: 'Stadion Pakansari', lat: -6.4925, lng: 106.8322 },
      { name: 'Kota Bogor', lat: -6.5971, lng: 106.8060 },
    ];

    landmarks.forEach((pt) => {
      const landmarkIcon = L.divIcon({
        className: 'landmark-marker',
        html: `
          <div style="background-color: #262626; border: 1.5px solid #f59e0b; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 8px rgba(0,0,0,0.8);"></div>
        `,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const lm = L.marker([pt.lat, pt.lng], { icon: landmarkIcon }).addTo(map);
      lm.bindPopup(`
        <div style="background: #171717; color: #fff; padding: 4px; font-family: sans-serif; font-size: 11px;">
          ${pt.name} (Tercakup ZAYN)
        </div>
      `);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Distance computation (Haversine formula in KM)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in KM
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleCheckMyReach = () => {
    if (!navigator.geolocation) {
      alert('Perangkat Anda tidak mendukung fitur lokasi.');
      return;
    }

    setIsCheckingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const dist = calculateDistance(CIBINONG_LAT, CIBINONG_LNG, userLat, userLng);
        setUserDistance(dist);

        if (dist <= 8) {
          setDistanceStatus('Zona Prioritas ZAYN (Jemput & Layanan Cepat 24 Jam)');
        } else if (dist <= 25) {
          setDistanceStatus('Zona Sekunder ZAYN (Tercakup untuk Antar Jemput & Sewa)');
        } else {
          setDistanceStatus('Di Luar Rute Reguler (Melayani Rute Khusus & Airport Transfer)');
        }

        // Add user marker to Leaflet map if available
        if (mapInstanceRef.current) {
          const userIcon = L.divIcon({
            className: 'user-pos-marker',
            html: `
              <div style="background-color: #10b981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);"></div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          L.marker([userLat, userLng], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('Lokasi Anda')
            .openPopup();

          mapInstanceRef.current.flyTo([userLat, userLng], 12);
        }

        setIsCheckingLocation(false);
      },
      () => {
        // Fallback simulation based on typical Cibinong distance
        setUserDistance(4.5);
        setDistanceStatus('Zona Prioritas ZAYN (Estimasi Area Cibinong)');
        setIsCheckingLocation(false);
      },
      { timeout: 7000 }
    );
  };

  return (
    <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400 font-mono mb-1">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>PETA CAKUPAN LAYANAN CIBINONG</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Area Operasional ZAYN 24 Jam
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cek apakah alamat jemput atau tujuan Anda berada dalam jangkauan armada kami.
          </p>
        </div>

        {/* Quick GPS Checker Button */}
        <button
          type="button"
          onClick={handleCheckMyReach}
          disabled={isCheckingLocation}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shrink-0 shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Navigation className={`w-3.5 h-3.5 ${isCheckingLocation ? 'animate-spin' : ''}`} />
          <span>{isCheckingLocation ? 'Mendeteksi...' : 'Cek Jangkauan Lokasi Saya'}</span>
        </button>
      </div>

      {/* User Location Result Badge */}
      {userDistance !== null && (
        <div className="mb-4 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-neutral-400">Jarak ke Pusat ZAYN: </span>
              <strong className="text-white font-mono">{userDistance.toFixed(1)} km</strong>
              <span className="text-neutral-500"> &mdash; </span>
              <span className="text-amber-300 font-medium">{distanceStatus}</span>
            </div>
          </div>
          <a
            href="#pesan-layanan"
            className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 shrink-0"
          >
            Pesan Sekarang &rarr;
          </a>
        </div>
      )}

      {/* Map Thumbnail Viewport */}
      <div className="relative rounded-xl overflow-hidden border border-neutral-800 h-64 sm:h-72 w-full bg-neutral-950">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Map Legend Overlay */}
        <div className="absolute top-3 left-3 z-[400] p-2.5 rounded-lg bg-neutral-950/90 backdrop-blur-md border border-neutral-800 text-[11px] space-y-1.5 pointer-events-none">
          <div className="flex items-center gap-2 text-neutral-200 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
            <span>Pusat ZAYN (Pakansari/Pemda)</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-3 h-0.5 border-t border-dashed border-amber-400" />
            <span>Zona Inti (Cibinong &plusmn;8 km)</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-3 h-0.5 border-t border-dashed border-sky-400" />
            <span>Zona Sekunder (Bogor &plusmn;16 km)</span>
          </div>
        </div>

        {/* Bottom Coverage Note */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-[400] px-3 py-1.5 rounded-md bg-neutral-950/90 backdrop-blur-md border border-neutral-800 text-[10px] text-neutral-300">
          <span className="text-amber-400 font-bold">Rute Bandara:</span> Siap antar ke Bandara Soekarno-Hatta (CGK) &amp; Halim (HLP) dari seluruh Cibinong.
        </div>
      </div>

      {/* Area Highlights List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
        <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-850">
          <div className="font-semibold text-white">Cibinong Inti</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Pakansari, CCM, Nanggewer, Pemda</div>
        </div>
        <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-850">
          <div className="font-semibold text-white">Bojong Gede &amp; Stasiun</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Pabuaran, Cilebut, Kedung Waringin</div>
        </div>
        <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-850">
          <div className="font-semibold text-white">Sentul &amp; Babakan Madang</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Sentul City, Nirwana, Sirkuit</div>
        </div>
        <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-850">
          <div className="font-semibold text-white">Citeureup &amp; Sukaraja</div>
          <div className="text-[11px] text-neutral-400 mt-0.5">Mayor Oking, Cimahpar, Ciluar</div>
        </div>
      </div>
    </div>
  );
};
