"use client";

import { useState } from "react";
import {
  MapPin,
  Loader2,
  AlertCircle,
  Navigation,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationButtonProps {
  userLocation: { lat: number; lng: number } | null;
  onLocationUpdate: (location: { lat: number; lng: number }) => void;
}

export const BotonLocation = ({
  userLocation,
  onLocationUpdate,
}: LocationButtonProps) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "La geolocalización no está soportada en este navegador"
      );
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationUpdate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = "Error obteniendo ubicación";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permiso de ubicación denegado";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Ubicación no disponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Tiempo de espera agotado";
            break;
        }

        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  if (locationError) {
    return (
      <Alert className="border-red-200 bg-red-50/50 backdrop-blur-sm rounded-2xl animate-slide-up">
        <div className="p-1 bg-red-100 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600" />
        </div>
        <AlertDescription className="flex items-center justify-between ml-2">
          <div>
            <p className="font-medium text-red-800">Error de ubicación</p>
            <p className="text-sm text-red-600">{locationError}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={requestLocation}
            className="ml-4 bg-white hover:bg-red-50 border-red-200 text-red-700 rounded-xl"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!userLocation) {
    return (
      <Alert className="border-primary/30 bg-primary/5 backdrop-blur-sm rounded-2xl animate-slide-up">
        <div className="p-1 bg-primary/10 rounded-lg">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
        <AlertDescription className="flex items-center justify-between ml-2">
          <div>
            <p className="font-medium text-foreground">Ubicación necesaria</p>
            <p className="text-sm text-muted-foreground">
              Para encontrar lugares cercanos a ti
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={requestLocation}
            disabled={isGettingLocation}
            className="ml-4 bg-primary/5 hover:bg-primary hover:text-primary-foreground border-primary/30 rounded-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            {isGettingLocation ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Obteniendo...
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 mr-2" />
                Permitir ubicación
              </>
            )}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-green-200 bg-green-50/50 backdrop-blur-sm rounded-2xl animate-slide-up">
      <div className="p-1 bg-green-100 rounded-lg">
        <CheckCircle className="h-4 w-4 text-green-600" />
      </div>
      <AlertDescription className="flex items-center justify-between ml-2">
        <div>
          <p className="font-medium text-green-800">Ubicación activa</p>
          <p className="text-sm text-green-600">
            Listo para buscar lugares cercanos
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={requestLocation}
          disabled={isGettingLocation}
          className="ml-4 text-green-700 hover:text-green-800 hover:bg-green-100 rounded-xl transition-all duration-200 hover:scale-105"
        >
          {isGettingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" />
              Actualizar
            </>
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
};
