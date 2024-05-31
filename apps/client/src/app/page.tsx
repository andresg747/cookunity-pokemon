"use client";
import CardList from "@/components/cards-list";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import PokemonCardImage from "@/components/card-image";
import { PokemonCard } from "@ag-cookunity/types";
import CardSelector from "@/components/card-selector";
import { useCards } from "@/hooks/use-cards";
import useSound from "@/hooks/use-sound";
import { VolumeIcon, VolumeXIcon } from "lucide-react";

function HomePageComponent() {
  const [mute, setMute] = useState(false);
  const audio = useSound("/sounds/battle.mp3");

  const [open, setOpen] = useState(false);
  const [selectedAttacker, setSelectedAttacker] = useState<
    PokemonCard | undefined
  >(undefined);
  const [selectedOpponent, setSelectedOpponent] = useState<
    PokemonCard | undefined
  >(undefined);

  const { data: cards, isLoading, isError } = useCards();

  useEffect(() => {
    if (open) {
      audio.volume = 0.02;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, open]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full relative">
        <Drawer
          open={open}
          onOpenChange={setOpen}
          onClose={() => {
            setSelectedAttacker(undefined);
            setSelectedOpponent(undefined);
          }}
          handleOnly
        >
          <DrawerContent className="bg-slate-800">
            <div className="relative">
              <div className="battle-background w-full h-full"></div>

              <DrawerHeader>
                <Button
                  onClick={() => {
                    if (mute) {
                      audio.muted = false;
                      setMute(false);
                    } else {
                      audio.muted = true;
                      setMute(true);
                    }
                  }}
                  className="bg-white opacity-80 w-14"
                  variant="ghost"
                >
                  {mute ? (
                    <VolumeIcon className="text-slate-900 text-md" />
                  ) : (
                    <VolumeXIcon className="text-slate-900 text-md" />
                  )}
                </Button>
                <DrawerTitle className="font-semibold text-white text-3xl text-center drop-shadow-md">
                  BATTLE MODE
                </DrawerTitle>
                <div className="mt-6 h-[350px] min-w-[900px] mx-auto">
                  <div className="flex items-center space-x-32 w-full mx-auto justify-between">
                    {selectedAttacker ? (
                      <PokemonCardImage
                        card={selectedAttacker}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedOpponent) setSelectedAttacker(undefined);
                          else setOpen(false);
                        }}
                      />
                    ) : (
                      <div className="w-[230px] h-[310px] flex items-center">
                        <CardSelector
                          cards={cards}
                          onCardSelected={(card: PokemonCard) =>
                            setSelectedAttacker(card)
                          }
                        />
                      </div>
                    )}

                    <div className="flex flex-col items-center space-y-6 bg-white p-5 rounded-lg">
                      <h2 className="text-red-600 text-4xl italic font-bold font-mono">
                        VS
                      </h2>
                      {selectedAttacker && selectedOpponent && (
                        <Button
                          variant="destructive"
                          className="w-24 font-semibold text-lg"
                          onClick={() => {
                            console.log(
                              "Battle between",
                              selectedAttacker.name,
                              "and",
                              selectedOpponent.name
                            );
                          }}
                        >
                          FIGHT
                        </Button>
                      )}
                    </div>

                    {selectedOpponent ? (
                      <PokemonCardImage
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedAttacker) setSelectedOpponent(undefined);
                        }}
                        card={selectedOpponent}
                      />
                    ) : (
                      <div className="w-[230px] h-[310px] flex items-center">
                        <CardSelector
                          cards={cards}
                          onCardSelected={(card: PokemonCard) =>
                            setSelectedOpponent(card)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </DrawerHeader>
              <DrawerFooter className="pt-2 items-center">
                <DrawerClose asChild>
                  <Button variant="outline" className="w-24">
                    Go back
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <CardList
          cards={cards}
          isError={isError}
          isLoading={isLoading}
          className="mt-8"
          onCardSelected={(card) => {
            setOpen(true);
            setSelectedAttacker(card);
          }}
        />
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <HomePageComponent />
    </QueryClientProvider>
  );
}
