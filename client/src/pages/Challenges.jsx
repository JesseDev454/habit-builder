import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trophy } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import ProgressBar from "../components/common/ProgressBar";
import { getChallenges, joinChallenge, seedDefaultChallenges } from "../api/challengeApi";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  const [seeding, setSeeding] = useState(false);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const data = await getChallenges();
      setChallenges(data.challenges || []);
    } catch (error) {
      toast.error(error.message || "Could not load challenges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const handleSeed = async () => {
    try {
      setSeeding(true);
      await seedDefaultChallenges();
      toast.success("Starter challenges are ready.");
      await loadChallenges();
    } catch (error) {
      toast.error(error.message || "Could not seed challenges.");
    } finally {
      setSeeding(false);
    }
  };

  const handleJoin = async (id) => {
    try {
      setJoiningId(id);
      const data = await joinChallenge(id);
      toast.success("Challenge joined");
      setChallenges((current) => current.map((challenge) => (challenge._id === id ? { ...challenge, ...data.challenge } : challenge)));
    } catch (error) {
      toast.error(error.message || "Could not join challenge.");
    } finally {
      setJoiningId(null);
    }
  };

  if (loading) return <LoadingSkeleton count={4} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[var(--color-primary)]">Epic Quests</p>
          <h1 className="font-display text-4xl font-extrabold">Simple Challenges</h1>
          <p className="mt-2 text-[var(--color-secondary)]">Join focused challenges and earn bonus XP for consistency.</p>
        </div>
        <Button loading={seeding} onClick={handleSeed} variant="secondary">Seed Challenges</Button>
      </div>

      {challenges.length === 0 ? (
        <EmptyState
          action="Seed Challenges"
          message="Seed starter challenges to begin your next quest."
          onAction={handleSeed}
          title="No challenges yet"
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {challenges.map((challenge) => {
            const progress = Math.min(100, Math.round(((challenge.userProgress || 0) / Math.max(challenge.goalValue || 1, 1)) * 100));
            const joined = Boolean(challenge.isJoined);
            const completed = challenge.userStatus === "completed";

            return (
              <Card key={challenge._id} className="hover-lift">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]">
                      <Trophy className="h-4 w-4" /> {challenge.category}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-extrabold">{challenge.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-secondary)]">{challenge.description}</p>
                    <p className="mt-2 text-sm text-[var(--color-secondary)]">Reward: {challenge.rewardXP} XP and {challenge.rewardCoins} coins</p>
                  </div>
                  <Button
                    disabled={joined}
                    loading={joiningId === challenge._id}
                    onClick={() => handleJoin(challenge._id)}
                    variant={joined ? "secondary" : "primary"}
                  >
                    {completed ? "Completed" : joined ? "Joined" : "Join"}
                  </Button>
                </div>
                <div className="mt-5">
                  <ProgressBar value={progress} color="var(--color-quest)" />
                  <p className="mt-2 text-xs font-bold text-[var(--color-muted)]">
                    {challenge.userProgress || 0}/{challenge.goalValue} progress | {challenge.durationDays} days | {challenge.difficulty}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Challenges;
