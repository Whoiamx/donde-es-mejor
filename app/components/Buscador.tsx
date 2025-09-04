"use client";

import type React from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const Buscador = ({
  onSearch,
  isLoading,
  value,
  onChange,
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative glass-effect rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border border-border/50 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center flex-1 relative">
              <div className="absolute left-3 sm:left-4 z-10">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="¿Qué estás buscando? Restaurantes, peluquerías..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-muted-foreground/70 font-medium"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="px-3 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100 shadow-lg text-sm sm:text-base"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Buscar</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {!value && (
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-3 sm:mt-4 justify-center">
            {["🍕 Pizza", "☕ Café", "✂️ Peluquería", "🛍️ Tienda"].map(
              (suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onChange(suggestion.split(" ")[1])}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full transition-all duration-200 hover:scale-105 truncate"
                >
                  {suggestion}
                </button>
              )
            )}
          </div>
        )}
      </form>
    </div>
  );
};
