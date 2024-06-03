"use client";

import PokemonCardImage from "@/components/card-image";
import CardSelector from "@/components/card-selector";
import CardList from "@/components/cards-list";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCards } from "@/hooks/queries/use-cards";
import { useFight } from "@/hooks/queries/use-fight";
import useSound from "@/hooks/use-sound";
import { BattleSummary, PokemonCard } from "@ag-cookunity/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VolumeIcon, VolumeXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const SOUND_COOKIE_NAME = "mute-sound";

function HomePageComponent() {
  const [cookies, setCookie] = useCookies([SOUND_COOKIE_NAME]);
  const [mute, setMute] = useState(cookies[SOUND_COOKIE_NAME] || false);

  const [battleOutcome, setBattleOutcome] = useState<
    | {
        text: string;
        battleSummary: BattleSummary;
      }
    | undefined
  >(undefined);
  const audio = useSound("/sounds/battle.mp3");

  const [open, setOpen] = useState(false);
  const [selectedAttacker, setSelectedAttacker] = useState<
    PokemonCard | undefined
  >(undefined);
  const [selectedOpponent, setSelectedOpponent] = useState<
    PokemonCard | undefined
  >(undefined);

  const { data: cards, isLoading, isError } = useCards();
  const { data: fightData, mutateAsync: fight } = useFight();

  useEffect(() => {
    if (!audio) return;
    if (mute) {
      audio.muted = true;
    } else {
      audio.muted = false;
    }
    if (open) {
      audio.volume = 0.02;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audio, open, mute]);

  const fightRequest = async () => {
    if (selectedAttacker && selectedOpponent) {
      const fightSummary = await fight({
        attacker: selectedAttacker.id,
        defender: selectedOpponent.id,
      });
      setBattleOutcome({
        text: fightSummary.succeeded ? "Attack succeeded!" : "Attack failed!",
        battleSummary: fightSummary.battleSummary,
      });
    }
  };

  useEffect(() => {
    setCookie(SOUND_COOKIE_NAME, mute.toString(), { path: "/" });
  }, [mute, setCookie]);

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full relative">
        <Drawer
          open={open}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedAttacker(undefined);
              setSelectedOpponent(undefined);
              setBattleOutcome(undefined);
            }
            setOpen(open);
          }}
          onClose={() => {
            setSelectedAttacker(undefined);
            setSelectedOpponent(undefined);
          }}
          handleOnly
        >
          <DrawerContent className="bg-slate-800">
            <div className="relative">
              <div className="battle-background w-full h-full"></div>

              <DrawerHeader className="pb-40">
                <div className="relative">
                  <Button
                    onClick={() => {
                      if (!audio) return;
                      if (mute) {
                        audio.muted = false;
                        setMute(false);
                      } else {
                        audio.muted = true;
                        setMute(true);
                      }
                    }}
                    className="absolute top-0 left-0 bg-white opacity-80 w-10 p-0 z-10"
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
                </div>
                <div className="mt-6 h-[350px] min-w-[900px] mx-auto">
                  <div className="flex items-start w-full mx-auto justify-between">
                    {selectedAttacker ? (
                      <div className="flex flex-col">
                        <h2 className="text-white font-bold italic">
                          Attacker
                        </h2>
                        <PokemonCardImage
                          card={selectedAttacker}
                          className="cursor-pointer"
                          onClick={() => {
                            if (selectedOpponent) {
                              setSelectedAttacker(undefined);
                              setBattleOutcome(undefined);
                            } else setOpen(false);
                          }}
                        />
                      </div>
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

                    <div className="flex flex-col items-center space-y-6 bg-white py-5 px-8 rounded-lg">
                      <h2 className="text-red-600 text-4xl italic font-bold font-mono">
                        VS
                      </h2>
                      {selectedAttacker && selectedOpponent && (
                        <Button
                          variant="destructive"
                          className="font-semibold text-lg"
                          onClick={fightRequest}
                        >
                          ATTACK
                        </Button>
                      )}

                      {battleOutcome && (
                        <div className="flex flex-col items-center space-y-2">
                          <h2 className="text-xl font-semibold text-red-600">
                            {battleOutcome.text}
                          </h2>
                          <p>
                            {selectedAttacker?.name} dealt{" "}
                            {fightData?.battleSummary.totalDamage} damage.
                          </p>
                          <p>
                            {selectedOpponent?.name} has{" "}
                            {fightData?.battleSummary.opponentLeftHp} HP left.
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedOpponent ? (
                      <div className="flex flex-col">
                        <h2 className="text-white font-bold italic">
                          Opponent
                        </h2>
                        <PokemonCardImage
                          className="cursor-pointer"
                          onClick={() => {
                            if (selectedAttacker) {
                              setSelectedOpponent(undefined);
                              setBattleOutcome(undefined);
                            }
                          }}
                          card={selectedOpponent}
                        />
                      </div>
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
