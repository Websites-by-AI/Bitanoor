"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Seller } from "@/types";

// Fix for Leaflet icons in Next.js
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

// Custom icon for sellers
const createSellerIcon = (priority: string) => {
  const iconUrls: Record<string, string> = {
    P1: "/images/marker-p1.png",
    P2: "/images/marker-p2.png",
    P3: "/images/marker-p3.png",
  };
  
  return L.icon({
    iconUrl: iconUrls[priority] || "/images/marker-icon.png",
    iconRetinaUrl: iconUrls[priority] || "/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

interface MapViewerProps {
  sellers: Seller[];
}

export default function MapViewer({ sellers }: MapViewerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize map
    const map = L.map(mapRef.current as HTMLElement, {
      center: [32.4279, 53.6880], // Center of Iran
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
    });

    // Add tile layers
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    const googleLayer = L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      attribution: '© Google Maps',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });

    const cartoLight = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
    });

    const cartoDark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/attributions">CARTO</a>',
    });

    // Add base layers
    const baseLayers = {
      "OpenStreetMap": osmLayer,
      "Google Maps": googleLayer,
      "Carto Light": cartoLight,
      "Carto Dark": cartoDark,
    };

    L.control.layers(baseLayers).addTo(map);
    osmLayer.addTo(map);

    // Add sellers to map
    sellers.forEach((seller) => {
      const marker = L.marker([seller.location.lat, seller.location.lng], {
        icon: createSellerIcon(seller.leadPriority),
        title: seller.name,
      });

      const popupContent = `
        <div style="min-width: 200px;">
          <h4 style="margin: 0 0 5px 0; font-size: 16px; font-weight: bold;">${seller.name}</h4>
          <p style="margin: 0 0 5px 0; color: #666;">${seller.location.city}</p>
          <p style="margin: 0 0 5px 0;">📞 ${seller.contact.phone}</p>
          <p style="margin: 0 0 5px 0;">⭐ ${seller.rating}/5</p>
          <p style="margin: 0;">💰 ${seller.samplePricePerLumen.toLocaleString()} IRR/lm</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(map);
    });

    // Store map reference
    mapRef.current = map;
    setIsLoaded(true);

    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [sellers]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    />
  );
}
