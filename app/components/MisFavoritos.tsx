"use client";

import { Heart, Trash2, Star, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Place {
  id: string;
  name: string;
  description: string;
  rating: number;
  address: string;
  category: string;
  distance?: string;
  image?: string;
}

interface FavoritesPanelProps {
  favorites: Place[];
  onRemoveFavorite: (place: Place) => void;
}

export const MisFavoritos = ({
  favorites,
  onRemoveFavorite,
}: FavoritesPanelProps) => {
  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="pb-6 border-b border-border/50">
        <SheetTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-xl">
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <span className="text-foreground">Mis Favoritos</span>
            <span className="text-sm text-muted-foreground ml-2">
              ({favorites.length})
            </span>
          </div>
        </SheetTitle>
      </SheetHeader>

      <ScrollArea className="flex-1 mt-4">
        {favorites.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="p-6 bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl w-fit mx-auto mb-6">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-3">
              No tienes favoritos aún
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Toca el corazón en cualquier lugar para agregarlo a tus favoritos
              y acceder rápidamente
            </p>
          </div>
        ) : (
          <div className="space-y-4 px-1">
            {favorites.map((place, index) => (
              <div
                key={place.id}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4 p-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        place.image ||
                        "/placeholder.svg?height=80&width=80&query=restaurant"
                      }
                      alt={place.name}
                      className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1">
                      <Heart className="h-3 w-3 fill-current" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
                        {place.name}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveFavorite(place)}
                        className="shrink-0 h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {place.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-foreground">
                            {place.rating}
                          </span>
                        </div>

                        {place.distance && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium text-primary">
                              {place.distance}
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 text-xs rounded-full bg-primary/5 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        Ver más
                      </Button>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{place.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {favorites.length > 0 && (
        <div className="border-t border-border/50 pt-4 mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 rounded-xl bg-transparent"
              onClick={() => favorites.forEach(onRemoveFavorite)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar todo
            </Button>
            <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
              <Sparkles className="h-4 w-4 mr-2" />
              Compartir lista
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
