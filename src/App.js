import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, X, Trophy, Sparkles } from 'lucide-react';

const WORKOUTS = {
  'Day 1': {
    name: 'Lower Power',
    focus: 'Squat · Glutes · Core',
    emoji: '🦵',
    gradient: ['#FF6B6B', '#FFA94D'],
    xp: 100,
    exercises: {
      1: [
        { name: '90/90 Breathing', sets: 2, reps: '8 breaths', rest: '30s', tip: 'Lie on back, feet on wall. Resets pelvic tilt.' },
        { name: 'Goblet Squat', sets: 3, reps: '10–12', rest: '90s', tip: 'Heels flat, pause 1s at bottom. Start 45–60lb DB.' },
        { name: 'Bulgarian Split Squat', sets: 3, reps: '10/leg', rest: '60s', tip: 'Back foot on bench. Front shin vertical.' },
        { name: 'DB Romanian Deadlift', sets: 3, reps: '12', rest: '90s', tip: 'Soft knees, hips back, hamstring stretch.' },
        { name: 'Dead Bug', sets: 3, reps: '10/side', rest: '45s', tip: 'Low back PRESSED to floor. Anti-APT gold.' },
        { name: 'Pallof Press', sets: 3, reps: '10/side', rest: '45s', tip: 'Press straight out, resist rotation.' }
      ],
      2: [
        { name: '90/90 Breathing', sets: 2, reps: '8 breaths', rest: '30s', tip: 'Same setup as Phase 1.' },
        { name: 'Front Squat', sets: 4, reps: '8', rest: '2min', tip: 'Bar on front delts, elbows high.' },
        { name: 'Bulgarian Split Squat (3-1-1)', sets: 4, reps: '10/leg', rest: '60s', tip: '3s down, 1s pause, 1s up. Tempo = growth.' },
        { name: 'DB Romanian Deadlift', sets: 4, reps: '10', rest: '90s', tip: 'Last set: drop 20lb, 5 more reps.' },
        { name: 'Cable Crunch', sets: 4, reps: '12', rest: '45s', tip: 'Heavy cable, full spinal flexion.' },
        { name: 'Pallof Press (3s hold)', sets: 3, reps: '10/side', rest: '45s', tip: '3s pause at full extension.' }
      ],
      3: [
        { name: '90/90 Breathing', sets: 2, reps: '8 breaths', rest: '30s', tip: 'Posture reset.' },
        { name: 'Back Squat', sets: 5, reps: '5', rest: '3min', tip: 'THE lift. Heaviest of cycle.' },
        { name: 'Walking Lunges (DB)', sets: 3, reps: '10/leg', rest: '90s', tip: 'Long stride, drive through front heel.' },
        { name: 'Belt Squat', sets: 3, reps: '12', rest: '60s', tip: 'Quad burnout, zero spinal load.' },
        { name: 'Hanging Leg Raise', sets: 4, reps: '10', rest: '45s', tip: 'Straight legs, pause at top.' },
        { name: 'Pallof Press (3s hold)', sets: 3, reps: '10/side', rest: '45s', tip: 'Anti-rotation. Obliques on fire.' }
      ]
    }
  },
  'Day 2': {
    name: 'Upper Push',
    focus: 'Chest · Shoulders · Tris',
    emoji: '💪',
    gradient: ['#4D96FF', '#6BCB77'],
    xp: 100,
    exercises: {
      1: [
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '30s', tip: 'Shoulder prep. Pinch shoulder blades.' },
        { name: 'Flat DB Bench Press', sets: 3, reps: '8–10', rest: '2min', tip: 'Feet planted, slight arch.' },
        { name: 'Seated DB Press', sets: 3, reps: '10', rest: '90s', tip: 'Slight elbow angle forward.' },
        { name: 'Incline DB Fly', sets: 3, reps: '12', rest: '60s', tip: 'Slight elbow bend, big stretch.' },
        { name: 'Cable Lateral Raise', sets: 3, reps: '12/side', rest: '45s', tip: 'Cable behind you. Constant tension.' },
        { name: 'Rope Tricep Pushdown', sets: 3, reps: '12', rest: '45s', tip: 'Elbows pinned. Pull rope apart at bottom.' }
      ],
      2: [
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '30s', tip: 'Shoulder prep.' },
        { name: 'Incline DB Bench Press', sets: 4, reps: '8–10', rest: '2min', tip: '30–45° incline. Upper chest = t-shirt muscle.' },
        { name: 'Flat DB Press + drop', sets: 3, reps: '10', rest: '90s', tip: 'Last set: drop 10–15lb, rep to failure.' },
        { name: 'Arnold Press', sets: 3, reps: '10', rest: '60s', tip: 'Rotate as you press. Hits all 3 delts.' },
        { name: 'Cable Chest Fly (low-high)', sets: 3, reps: '12', rest: '45s', tip: '2-1-2 tempo. Squeeze peak.' },
        { name: 'Cable Lateral Raise', sets: 4, reps: '12/side', rest: '45s', tip: 'Capped delts = smaller-looking waist.' },
        { name: 'EZ Bar Skull Crusher', sets: 3, reps: '10', rest: '60s', tip: 'Elbows pinned, lower to forehead.' }
      ],
      3: [
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '30s', tip: 'Shoulder prep.' },
        { name: 'Barbell Bench Press', sets: 5, reps: '5', rest: '2.5min', tip: 'Heaviest of cycle. Brief chest pause.' },
        { name: 'Barbell Overhead Press', sets: 4, reps: '5', rest: '2min', tip: 'Standing. Brace abs HARD.' },
        { name: 'Weighted Dips', sets: 3, reps: '8', rest: '90s', tip: 'Lean forward = chest. Upright = tris.' },
        { name: 'Cable Lateral Raise', sets: 3, reps: '12', rest: '45s', tip: 'Burnout sets, near failure.' },
        { name: 'Close Grip Bench', sets: 3, reps: '8', rest: '60s', tip: 'Hands shoulder-width. Triceps mass.' }
      ]
    }
  },
  'Day 3': {
    name: 'Athletic Day',
    focus: 'Power · Explosive',
    emoji: '⚡',
    gradient: ['#FFD93D', '#FF6B6B'],
    xp: 125,
    exercises: {
      1: [
        { name: 'Dynamic Warmup', sets: 1, reps: '5 min', rest: '—', tip: 'Leg swings, hip openers, world\'s greatest stretch.' },
        { name: 'Medicine Ball Slams', sets: 5, reps: '8', rest: '45s', tip: 'Full overhead extension. SLAM. Use 15–20lb.' },
        { name: 'Trap Bar Deadlift', sets: 4, reps: '5', rest: '2min', tip: 'Drive the floor away — power, not grind.' },
        { name: 'Farmers Carry', sets: 4, reps: '30s walks', rest: '60s', tip: 'Heaviest DBs. Ribs down, brace.' },
        { name: 'Step Box Jumps', sets: 4, reps: '5', rest: '60s', tip: 'Soft landing. STEP down.' },
        { name: 'Side Plank', sets: 2, reps: '30s/side', rest: '30s', tip: 'Stack hips. Don\'t let them drop.' }
      ],
      2: [
        { name: 'Dynamic Warmup', sets: 1, reps: '5 min', rest: '—', tip: 'Mobility flow.' },
        { name: 'Trap Bar Jump', sets: 5, reps: '3', rest: '90s', tip: 'Light load. EXPLODE off floor.' },
        { name: 'Medicine Ball Slams', sets: 5, reps: '10', rest: '45s', tip: '20lb ball. Fast pace.' },
        { name: 'Landmine Thruster', sets: 4, reps: '8/side', rest: '60s', tip: 'Squat to OHP in one motion.' },
        { name: 'Farmers Carry', sets: 4, reps: '40s walks', rest: '60s', tip: 'Heaviest DBs. Don\'t break posture.' },
        { name: 'Box Jumps', sets: 4, reps: '5', rest: '60s', tip: 'Higher box than P1.' }
      ],
      3: [
        { name: 'Dynamic Warmup', sets: 1, reps: '5 min', rest: '—', tip: 'Get warm.' },
        { name: 'Push Press', sets: 5, reps: '3', rest: '90s', tip: 'Dip-drive-press. Athletic power.' },
        { name: 'Medicine Ball Slams', sets: 6, reps: '8', rest: '30s', tip: '20lb, fast pace. The BURN round.' },
        { name: 'Trap Bar Deadlift', sets: 4, reps: '5', rest: '2min', tip: 'Moderate-heavy. Explosive.' },
        { name: 'Farmers Carry (heavy)', sets: 5, reps: '40s', rest: '45s', tip: 'Heaviest DBs.' },
        { name: 'Band Sprints', sets: 4, reps: '20s all-out', rest: '60s', tip: 'Band around waist. Pure conditioning.' }
      ]
    }
  },
  'Day 4': {
    name: 'Posterior Power',
    focus: 'Hams · Glutes · Posture',
    emoji: '🍑',
    gradient: ['#A855F7', '#EC4899'],
    xp: 100,
    exercises: {
      1: [
        { name: 'Dead Bug', sets: 2, reps: '10/side', rest: '30s', tip: 'Anti-APT warmup.' },
        { name: 'Barbell Hip Thrust', sets: 3, reps: '10–12', rest: '90s', tip: 'Drive through heels. Squeeze glutes HARD.' },
        { name: 'Romanian Deadlift', sets: 3, reps: '8–10', rest: '2min', tip: 'Hips back, bar close.' },
        { name: 'Back Extension', sets: 3, reps: '12', rest: '60s', tip: 'Round upper back slightly for glutes.' },
        { name: 'Single Leg RDL', sets: 2, reps: '8/leg', rest: '60s', tip: 'Slow and controlled.' },
        { name: 'Hanging Knee Raise', sets: 3, reps: '10–12', rest: '45s', tip: 'Knees to chest, no swinging.' }
      ],
      2: [
        { name: 'Dead Bug (slow)', sets: 2, reps: '10/side', rest: '30s', tip: '3s extending, 3s back.' },
        { name: 'Barbell Hip Thrust (pause)', sets: 4, reps: '10', rest: '90s', tip: '3s pause at top.' },
        { name: 'Stiff Leg Deadlift', sets: 4, reps: '8', rest: '2min', tip: 'Stiffer knees than RDL.' },
        { name: 'Nordic Curl', sets: 3, reps: '5–8', rest: '90s', tip: 'Hardest movement in your gym.' },
        { name: 'Single Leg RDL', sets: 3, reps: '8/leg', rest: '60s', tip: 'Heavier than P1.' },
        { name: 'Hanging Leg Raise', sets: 3, reps: '8–10', rest: '60s', tip: 'STRAIGHT legs. Lower slowly.' },
        { name: 'Side Plank w/ Reach', sets: 2, reps: '8/side', rest: '30s', tip: 'Reach under torso, then up.' }
      ],
      3: [
        { name: 'Dead Bug (slow)', sets: 2, reps: '10/side', rest: '30s', tip: 'Slow tempo.' },
        { name: 'Conventional Deadlift', sets: 5, reps: '5', rest: '3min', tip: 'Heaviest of cycle.' },
        { name: 'Barbell Hip Thrust (heavy)', sets: 4, reps: '8', rest: '90s', tip: 'Add plates. Pause each rep.' },
        { name: 'Nordic Curl', sets: 3, reps: '6–8', rest: '90s', tip: 'Unassisted by now.' },
        { name: 'Back Extension (weighted)', sets: 3, reps: '10', rest: '60s', tip: 'Hold plate at chest.' },
        { name: 'Cable Crunch (heavy)', sets: 4, reps: '12', rest: '45s', tip: 'Heaviest weight, clean form.' }
      ]
    }
  },
  'Day 5': {
    name: 'Pull Day',
    focus: 'Back · Biceps · V-Taper',
    emoji: '🔥',
    gradient: ['#06B6D4', '#3B82F6'],
    xp: 100,
    exercises: {
      1: [
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '30s', tip: 'Shoulder prep.' },
        { name: 'Pull Ups (or Pulldown)', sets: 3, reps: 'AMRAP / 8–10', rest: '90s', tip: '6+ BW pull-ups? Do pull-ups.' },
        { name: 'Chest Supported DB Row', sets: 3, reps: '10', rest: '90s', tip: 'Bench 30°. Pull elbows back.' },
        { name: 'Face Pull', sets: 3, reps: '15', rest: '45s', tip: 'Rope to forehead, elbows high.' },
        { name: 'EZ Bar Curl', sets: 3, reps: '10', rest: '60s', tip: 'Controlled. Don\'t swing.' },
        { name: 'Hammer Curl', sets: 2, reps: '12', rest: '45s', tip: 'Forearms + brachialis.' },
        { name: 'Cable Crunch', sets: 3, reps: '12', rest: '45s', tip: 'Crunch DOWN, flex abs.' }
      ],
      2: [
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '30s', tip: 'Shoulder prep.' },
        { name: 'Weighted Pull Ups', sets: 4, reps: '6–8', rest: '90s', tip: 'Add weight via belt.' },
        { name: 'Barbell Bent Over Row', sets: 4, reps: '8', rest: '90s', tip: 'Hip hinge, flat back.' },
        { name: 'Single Arm Cable Row', sets: 3, reps: '10/side', rest: '60s', tip: 'Twist torso at end.' },
        { name: 'Face Pull', sets: 4, reps: '15', rest: '45s', tip: 'Posture work. Never skip.' },
        { name: 'Incline DB Curl', sets: 3, reps: '10', rest: '60s', tip: 'Full bicep stretch.' },
        { name: 'Rope Hammer Curl', sets: 3, reps: '12', rest: '45s', tip: 'Continuous tension.' }
      ],
      3: [
        { name: 'Band Pull-Apart', sets: 2, reps: '15', rest: '30s', tip: 'Shoulder prep.' },
        { name: 'Weighted Pull Ups', sets: 5, reps: '5', rest: '2min', tip: 'Add weight aggressively.' },
        { name: 'Pendlay Row', sets: 4, reps: '6', rest: '90s', tip: 'Bar resets on floor. Explosive.' },
        { name: 'Meadows Row (Landmine)', sets: 3, reps: '10/side', rest: '60s', tip: 'One-arm landmine row.' },
        { name: 'Face Pull', sets: 4, reps: '15', rest: '45s', tip: 'Posture. Never skip.' },
        { name: 'Barbell Curl', sets: 4, reps: '8', rest: '60s', tip: 'Strict form.' },
        { name: 'Cable Curl (drop)', sets: 1, reps: '10/10/10', rest: '—', tip: 'Heavy 10, drop, drop. Pump finisher.' }
      ]
    }
  }
};

const PHASES = {
  1: { name: 'Foundation', setRep: '3 × 8–12 @ RPE 7' },
  2: { name: 'Hypertrophy', setRep: '4 × 8–12 @ RPE 8' },
  3: { name: 'Strength + Definition', setRep: '4–5 × 4–6 @ RPE 8–9' }
};

const MACRO_TARGETS = { calories: 2400, protein: 180, carbs: 260, fat: 70, fiber: 35, water: 16 };

const ACHIEVEMENTS = [
  { id: 'first_workout', name: 'First Rep', emoji: '🎯', desc: 'Complete your first workout', check: (d) => Object.keys(d.workouts).length >= 1 },
  { id: 'week_warrior', name: 'Week Warrior', emoji: '⚔️', desc: '5 workouts in a week', check: (d) => Object.keys(d.workouts).length >= 5 },
  { id: 'protein_pro', name: 'Protein Pro', emoji: '🍗', desc: 'Hit protein target', check: (d) => Object.values(d.macros).some(m => m.protein >= 180) },
  { id: 'consistent', name: 'Locked In', emoji: '🔒', desc: 'Log 10 days', check: (d) => Object.keys(d.macros).length >= 10 },
  { id: 'tracking_king', name: 'Data Driven', emoji: '📊', desc: 'Log 3 weigh-ins', check: (d) => Object.keys(d.body).length >= 3 },
  { id: 'phase_one', name: 'Foundation', emoji: '🏗️', desc: 'Complete 20 workouts', check: (d) => Object.keys(d.workouts).length >= 20 }
];

const getWeekNumber = (startDate) => {
  if (!startDate) return 1;
  const start = new Date(startDate);
  const now = new Date();
  const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.min(12, Math.max(1, Math.floor(days / 7) + 1));
};

const getPhaseFromWeek = (week) => {
  if (week <= 4) return 1;
  if (week <= 8) return 2;
  return 3;
};

const TrainingApp = () => {
  const [screen, setScreen] = useState('home');
  const [workoutData, setWorkoutData] = useState({});
  const [macroData, setMacroData] = useState({});
  const [bodyData, setBodyData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [celebration, setCelebration] = useState(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Load from localStorage
    const savedWorkouts = localStorage.getItem('ryan_workouts');
    const savedMacros = localStorage.getItem('ryan_macros');
    const savedBody = localStorage.getItem('ryan_body');
    const savedStart = localStorage.getItem('ryan_start');

    if (savedWorkouts) setWorkoutData(JSON.parse(savedWorkouts));
    if (savedMacros) setMacroData(JSON.parse(savedMacros));
    if (savedBody) setBodyData(JSON.parse(savedBody));
    if (savedStart) setStartDate(savedStart);
    else {
      setStartDate(today);
      localStorage.setItem('ryan_start', today);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveWorkouts = (data) => {
    setWorkoutData(data);
    localStorage.setItem('ryan_workouts', JSON.stringify(data));
  };
  const saveMacros = (data) => {
    setMacroData(data);
    localStorage.setItem('ryan_macros', JSON.stringify(data));
  };
  const saveBody = (data) => {
    setBodyData(data);
    localStorage.setItem('ryan_body', JSON.stringify(data));
  };

  if (loading) {
    return (
      <div style={{ background: 'linear-gradient(135deg, #FFF5E6, #FFE5EC)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '32px' }}>💪</div>
      </div>
    );
  }

  const currentWeek = getWeekNumber(startDate);
  const currentPhase = getPhaseFromWeek(currentWeek);
  const totalXP = Object.values(workoutData).reduce((sum, w) => sum + (WORKOUTS[w.day]?.xp || 100), 0);
  const level = Math.floor(totalXP / 500) + 1;
  const xpInLevel = totalXP % 500;
  const todayMacros = macroData[today] || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, water: 0 };
  const workoutsThisWeek = Object.keys(workoutData).filter(d => {
    const date = new Date(d);
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    return date >= weekAgo;
  }).length;

  const data = { workouts: workoutData, macros: macroData, body: bodyData };
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.check(data));

  return (
    <div style={{ 
      background: 'linear-gradient(180deg, #FFF5E6 0%, #FFE5EC 100%)', 
      minHeight: '100vh', 
      fontFamily: '"Nunito", "SF Pro Rounded", -apple-system, sans-serif',
      color: '#2D1B3D',
      paddingBottom: '100px'
    }}>
      {celebration && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)'
        }}
        onClick={() => setCelebration(null)}>
          <div style={{
            background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)',
            borderRadius: '24px',
            padding: '40px 32px',
            textAlign: 'center',
            animation: 'pop 0.4s ease',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            maxWidth: '320px'
          }}>
            <div style={{ fontSize: '72px', marginBottom: '12px' }}>{celebration.emoji}</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>{celebration.title}</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{celebration.desc}</div>
            {celebration.xp && <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff', marginTop: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '999px', padding: '8px 24px', display: 'inline-block' }}>+{celebration.xp} XP</div>}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {screen === 'home' && <HomeScreen {...{ today, todayMacros, workoutsThisWeek, bodyData, setScreen, setSelectedDay, workoutData, totalXP, level, xpInLevel, unlockedAchievements, currentWeek, currentPhase }} />}
        {screen === 'workout' && <WorkoutScreen {...{ setScreen, setSelectedDay, workoutData, currentPhase, currentWeek }} />}
        {screen === 'workoutDetail' && selectedDay && <WorkoutDetailScreen {...{ selectedDay, setScreen, today, workoutData, saveWorkouts, setCelebration, currentPhase, currentWeek }} />}
        {screen === 'macros' && <MacrosScreen {...{ setScreen, today, todayMacros, macroData, saveMacros, setCelebration }} />}
        {screen === 'progress' && <ProgressScreen {...{ setScreen, workoutData, macroData, bodyData, saveBody, unlockedAchievements, totalXP, level }} />}
      </div>

      <BottomNav screen={screen} setScreen={setScreen} />
    </div>
  );
};

// ============ HOME ============
const HomeScreen = ({ today, todayMacros, workoutsThisWeek, bodyData, setScreen, setSelectedDay, workoutData, totalXP, level, xpInLevel, unlockedAchievements, currentWeek, currentPhase }) => {
  const recentBody = Object.keys(bodyData).sort().reverse()[0];
  const recentWeight = recentBody ? bodyData[recentBody].weight : '205';
  const dayOfWeek = new Date().getDay();
  const dayMap = { 1: 'Day 1', 2: 'Day 2', 3: 'Day 3', 4: 'Day 4', 5: 'Day 5' };
  const suggestedDay = dayMap[dayOfWeek] || 'Day 1';
  const completedToday = workoutData[today];
  const w = WORKOUTS[suggestedDay];

  return (
    <div style={{ padding: '24px 20px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #2D1B3D 0%, #6B21A8 100%)',
        borderRadius: '20px',
        padding: '16px 20px',
        marginBottom: '16px',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(45, 27, 61, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #FFD93D, #FF6B6B)', 
              borderRadius: '50%', 
              width: '44px', height: '44px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '900', fontSize: '18px', color: '#2D1B3D',
              boxShadow: '0 4px 12px rgba(255, 217, 61, 0.5)'
            }}>{level}</div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.7, fontWeight: '600' }}>LEVEL {level}</div>
              <div style={{ fontSize: '15px', fontWeight: '800' }}>Ryan</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '900' }}>{totalXP}</div>
            <div style={{ fontSize: '10px', opacity: 0.7, fontWeight: '600', letterSpacing: '1px' }}>TOTAL XP</div>
          </div>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${(xpInLevel / 500) * 100}%`,
            background: 'linear-gradient(90deg, #FFD93D, #FF6B6B)',
            borderRadius: '4px', transition: 'width 0.4s'
          }} />
        </div>
        <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '6px', fontWeight: '600' }}>
          {500 - xpInLevel} XP to level {level + 1}
        </div>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '14px',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(45, 27, 61, 0.08)',
        border: '2px solid #F1E5F5'
      }}>
        <div>
          <div style={{ fontSize: '10px', fontWeight: '900', color: '#6B21A8', letterSpacing: '1.5px' }}>
            PHASE {currentPhase} · {PHASES[currentPhase].name.toUpperCase()}
          </div>
          <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '700', marginTop: '2px' }}>
            {PHASES[currentPhase].setRep}
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #FFD93D, #FFA94D)',
          borderRadius: '999px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: '900',
          color: '#2D1B3D'
        }}>WEEK {currentWeek}/12</div>
      </div>

      <div style={{ fontSize: '12px', fontWeight: '800', color: '#6B21A8', letterSpacing: '1.5px', marginBottom: '8px' }}>
        🔥 TODAY'S CHALLENGE
      </div>
      <div
        onClick={() => { setSelectedDay(suggestedDay); setScreen('workoutDetail'); }}
        style={{
          background: `linear-gradient(135deg, ${w.gradient[0]} 0%, ${w.gradient[1]} 100%)`,
          borderRadius: '24px',
          padding: '24px',
          marginBottom: '20px',
          cursor: 'pointer',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 12px 30px ${w.gradient[0]}55`
        }}
      >
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', fontSize: '120px', opacity: 0.15 }}>{w.emoji}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '8px', animation: 'bounce 2s ease infinite' }}>{w.emoji}</div>
            <div style={{ fontSize: '11px', opacity: 0.9, fontWeight: '800', letterSpacing: '1.5px', marginBottom: '2px' }}>{suggestedDay.toUpperCase()}</div>
            <div style={{ fontSize: '26px', fontWeight: '900', marginBottom: '2px', letterSpacing: '-0.5px' }}>{w.name}</div>
            <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '600' }}>{w.focus}</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.25)', borderRadius: '999px',
            padding: '6px 14px', fontSize: '13px', fontWeight: '900',
            display: 'flex', alignItems: 'center', gap: '4px',
            backdropFilter: 'blur(8px)'
          }}>
            <Sparkles size={14} />+{w.xp} XP
          </div>
        </div>
        <div style={{
          marginTop: '20px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '14px',
          padding: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '800' }}>
            {completedToday ? '✓ CRUSHED IT' : 'TAP TO START'}
          </div>
          {completedToday ? <Check size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <FunStat emoji="🔥" label="WEEK STREAK" value={`${workoutsThisWeek}/5`} bg="#FFEDD5" accent="#EA580C" />
        <FunStat emoji="⚖️" label="WEIGHT" value={`${recentWeight} lb`} bg="#DBEAFE" accent="#2563EB" />
      </div>

      <div
        onClick={() => setScreen('macros')}
        style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '20px',
          marginBottom: '20px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(45, 27, 61, 0.08)',
          border: '2px solid #FFE5EC'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '20px' }}>🍽️</div>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#2D1B3D' }}>FUEL CHECK</div>
          </div>
          <ChevronRight size={18} color="#A855F7" />
        </div>
        <FunMacroBar label="Protein" emoji="🍗" current={todayMacros.protein} target={MACRO_TARGETS.protein} color="#FF6B6B" unit="g" />
        <FunMacroBar label="Carbs" emoji="🍚" current={todayMacros.carbs} target={MACRO_TARGETS.carbs} color="#4D96FF" unit="g" />
        <FunMacroBar label="Fat" emoji="🥑" current={todayMacros.fat} target={MACRO_TARGETS.fat} color="#FFD93D" unit="g" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingTop: '14px', borderTop: '2px dashed #F1E5F5' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#A855F7', fontWeight: '800', letterSpacing: '1px' }}>CALORIES</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#2D1B3D' }}>{todayMacros.calories} <span style={{ fontSize: '12px', color: '#9CA3AF' }}>/ {MACRO_TARGETS.calories}</span></div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#A855F7', fontWeight: '800', letterSpacing: '1px' }}>💧 WATER</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#2D1B3D' }}>{todayMacros.water} <span style={{ fontSize: '12px', color: '#9CA3AF' }}>/ {MACRO_TARGETS.water}</span></div>
          </div>
        </div>
      </div>

      {unlockedAchievements.length > 0 && (
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(45, 27, 61, 0.08)',
          border: '2px solid #FEF3C7'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Trophy size={18} color="#F59E0B" />
            <div style={{ fontSize: '14px', fontWeight: '900' }}>UNLOCKED</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {unlockedAchievements.slice(0, 4).map(a => (
              <div key={a.id} style={{
                background: 'linear-gradient(135deg, #FFD93D, #FFA94D)',
                borderRadius: '16px', padding: '12px',
                textAlign: 'center', minWidth: '78px'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{a.emoji}</div>
                <div style={{ fontSize: '9px', fontWeight: '900', color: '#2D1B3D', letterSpacing: '0.5px' }}>{a.name.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const FunStat = ({ emoji, label, value, bg, accent }) => (
  <div style={{
    background: bg,
    borderRadius: '20px',
    padding: '16px',
    border: `2px solid ${accent}33`
  }}>
    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{emoji}</div>
    <div style={{ fontSize: '10px', color: accent, fontWeight: '800', letterSpacing: '1px' }}>{label}</div>
    <div style={{ fontSize: '22px', fontWeight: '900', color: '#2D1B3D', marginTop: '2px' }}>{value}</div>
  </div>
);

const FunMacroBar = ({ label, emoji, current, target, color, unit }) => {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ fontSize: '14px' }}>{emoji}</div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#2D1B3D' }}>{label}</div>
        </div>
        <div style={{ fontSize: '12px', fontWeight: '800', color: '#2D1B3D' }}>
          {current}<span style={{ color: '#9CA3AF', fontWeight: '600' }}>/{target}{unit}</span>
        </div>
      </div>
      <div style={{ height: '10px', background: '#F1E5F5', borderRadius: '5px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          borderRadius: '5px', transition: 'width 0.4s ease'
        }} />
      </div>
    </div>
  );
};

// ============ WORKOUT LIST ============
const WorkoutScreen = ({ setScreen, setSelectedDay, workoutData, currentPhase, currentWeek }) => {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div style={{ padding: '24px 20px' }}>
      <FunHeader emoji="🏋️" title="Pick Your Battle" subtitle={`Phase ${currentPhase} · Week ${currentWeek}`} />
      {Object.keys(WORKOUTS).map(day => {
        const w = WORKOUTS[day];
        const completed = workoutData[today]?.day === day;
        const exercises = w.exercises[currentPhase];
        return (
          <div
            key={day}
            onClick={() => { setSelectedDay(day); setScreen('workoutDetail'); }}
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '18px',
              marginBottom: '14px',
              cursor: 'pointer',
              border: `3px solid ${completed ? w.gradient[0] : '#F1E5F5'}`,
              boxShadow: '0 6px 18px rgba(45, 27, 61, 0.08)',
              display: 'flex', alignItems: 'center', gap: '14px'
            }}
          >
            <div style={{
              background: `linear-gradient(135deg, ${w.gradient[0]}, ${w.gradient[1]})`,
              borderRadius: '16px',
              width: '60px', height: '60px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '32px', flexShrink: 0
            }}>{w.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '10px', fontWeight: '800', color: w.gradient[0], letterSpacing: '1.5px', marginBottom: '2px' }}>{day.toUpperCase()}</div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#2D1B3D' }}>{w.name}</div>
              <div style={{ fontSize: '12px', color: '#6B21A8', fontWeight: '600', marginTop: '2px' }}>{w.focus} · {exercises.length} ex</div>
            </div>
            <div style={{
              background: completed ? w.gradient[0] : '#FEF3C7',
              borderRadius: '999px',
              padding: '6px 12px',
              fontSize: '11px', fontWeight: '900',
              color: completed ? '#fff' : '#F59E0B',
              display: 'flex', alignItems: 'center', gap: '3px'
            }}>
              {completed ? <Check size={12} /> : <><Sparkles size={11} />+{w.xp}</>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============ WORKOUT DETAIL ============
const WorkoutDetailScreen = ({ selectedDay, setScreen, today, workoutData, saveWorkouts, setCelebration, currentPhase, currentWeek }) => {
  const w = WORKOUTS[selectedDay];
  const exercises = w.exercises[currentPhase];
  const existing = workoutData[today]?.day === selectedDay ? workoutData[today].sets : {};

  const initialSets = {};
  exercises.forEach(ex => {
    const exSets = existing[ex.name] || Array(ex.sets).fill(null).map(() => ({ weight: '', reps: '', done: false }));
    initialSets[ex.name] = exSets;
  });
  const [sets, setSets] = useState(initialSets);

  const updateSet = (exName, setIdx, field, value) => {
    setSets(prev => ({
      ...prev,
      [exName]: prev[exName].map((s, i) => i === setIdx ? { ...s, [field]: value } : s)
    }));
  };
  const toggleDone = (exName, setIdx) => {
    setSets(prev => ({
      ...prev,
      [exName]: prev[exName].map((s, i) => i === setIdx ? { ...s, done: !s.done } : s)
    }));
  };

  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = Object.values(sets).flat().filter(s => s.done).length;
  const progress = (completedSets / totalSets) * 100;

  const completeWorkout = () => {
    const updated = { ...workoutData, [today]: { day: selectedDay, sets, completedAt: new Date().toISOString(), phase: currentPhase, week: currentWeek } };
    saveWorkouts(updated);
    setCelebration({ emoji: w.emoji, title: 'WORKOUT COMPLETE!', desc: w.name, xp: w.xp });
    setTimeout(() => setScreen('home'), 2000);
  };

  return (
    <div style={{ padding: '24px 20px' }}>
      <div onClick={() => setScreen('workout')} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#6B21A8', fontSize: '13px', fontWeight: '800', marginBottom: '16px', cursor: 'pointer', background: '#fff', padding: '8px 14px', borderRadius: '999px' }}>
        <X size={14} /> Back
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${w.gradient[0]}, ${w.gradient[1]})`,
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '20px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', fontSize: '140px', opacity: 0.15 }}>{w.emoji}</div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>{w.emoji}</div>
          <div style={{ fontSize: '11px', opacity: 0.9, fontWeight: '800', letterSpacing: '1.5px' }}>{selectedDay.toUpperCase()} · PHASE {currentPhase}</div>
          <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '-0.5px', marginTop: '2px' }}>{w.name}</div>
          <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '600', marginTop: '2px' }}>{PHASES[currentPhase].setRep}</div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', marginBottom: '4px' }}>
              <span>{completedSets}/{totalSets} SETS</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: '10px', background: 'rgba(255,255,255,0.25)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#fff', borderRadius: '5px', transition: 'width 0.4s' }} />
            </div>
          </div>
        </div>
      </div>

      {exercises.map((ex, i) => {
        const exSets = sets[ex.name];
        const allDone = exSets.every(s => s.done);
        return (
          <div key={ex.name} style={{
            background: '#fff',
            borderRadius: '18px',
            padding: '16px',
            marginBottom: '12px',
            border: `2px solid ${allDone ? w.gradient[0] : '#F1E5F5'}`,
            boxShadow: '0 4px 12px rgba(45, 27, 61, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                background: allDone ? w.gradient[0] : '#F1E5F5',
                color: allDone ? '#fff' : '#A855F7',
                borderRadius: '50%',
                width: '30px', height: '30px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: '900'
              }}>
                {allDone ? <Check size={16} /> : i + 1}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#2D1B3D', flex: 1 }}>{ex.name}</div>
            </div>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <div style={{ background: '#DBEAFE', border: '1px solid #2563EB44', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '900', color: '#2563EB', letterSpacing: '0.5px' }}>
                {ex.sets} × {ex.reps}
              </div>
              <div style={{ background: '#FEE2E2', border: '1px solid #DC262644', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '900', color: '#DC2626', letterSpacing: '0.5px' }}>
                REST {ex.rest}
              </div>
            </div>

            <div style={{ fontSize: '12px', color: '#6B21A8', fontStyle: 'italic', marginBottom: '12px', lineHeight: '1.3' }}>
              ▸ {ex.tip}
            </div>

            <div style={{ background: '#FFF5E6', borderRadius: '12px', padding: '10px', border: '1px solid #FEF3C7' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 30px', gap: '8px', marginBottom: '6px' }}>
                <div style={{ fontSize: '9px', color: '#9CA3AF', fontWeight: '900', letterSpacing: '1px', textAlign: 'center' }}>SET</div>
                <div style={{ fontSize: '9px', color: '#2563EB', fontWeight: '900', letterSpacing: '1px', textAlign: 'center' }}>WEIGHT</div>
                <div style={{ fontSize: '9px', color: '#DC2626', fontWeight: '900', letterSpacing: '1px', textAlign: 'center' }}>REPS</div>
                <div></div>
              </div>
              {exSets.map((set, setIdx) => (
                <div key={setIdx} style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 30px', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                  <div style={{
                    fontSize: '13px', fontWeight: '900',
                    color: set.done ? w.gradient[0] : '#9CA3AF',
                    textAlign: 'center'
                  }}>{setIdx + 1}</div>
                  <input
                    type="number"
                    placeholder="lb"
                    value={set.weight}
                    onChange={(e) => updateSet(ex.name, setIdx, 'weight', e.target.value)}
                    style={{
                      width: '100%', background: '#fff',
                      border: `2px solid ${set.done ? w.gradient[0] : '#2563EB'}55`,
                      borderRadius: '8px', padding: '6px',
                      color: '#2D1B3D', fontSize: '14px', fontWeight: '900',
                      outline: 'none', textAlign: 'center', boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="reps"
                    value={set.reps}
                    onChange={(e) => updateSet(ex.name, setIdx, 'reps', e.target.value)}
                    style={{
                      width: '100%', background: '#fff',
                      border: `2px solid ${set.done ? w.gradient[0] : '#DC2626'}55`,
                      borderRadius: '8px', padding: '6px',
                      color: '#2D1B3D', fontSize: '14px', fontWeight: '900',
                      outline: 'none', textAlign: 'center', boxSizing: 'border-box'
                    }}
                  />
                  <div
                    onClick={() => toggleDone(ex.name, setIdx)}
                    style={{
                      background: set.done ? `linear-gradient(135deg, ${w.gradient[0]}, ${w.gradient[1]})` : '#fff',
                      border: `2px solid ${w.gradient[0]}`,
                      borderRadius: '8px',
                      width: '28px', height: '28px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.15s'
                    }}
                  >
                    {set.done && <Check size={14} color="#fff" strokeWidth={3} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <button
        onClick={completeWorkout}
        style={{
          width: '100%',
          background: `linear-gradient(135deg, ${w.gradient[0]}, ${w.gradient[1]})`,
          border: 'none', borderRadius: '20px',
          padding: '18px', color: '#fff',
          fontSize: '16px', fontWeight: '900',
          letterSpacing: '0.5px', cursor: 'pointer', marginTop: '8px',
          boxShadow: `0 8px 24px ${w.gradient[0]}55`
        }}
      >
        🎉 COMPLETE & EARN {w.xp} XP
      </button>
    </div>
  );
};

// ============ MACROS ============
const MacrosScreen = ({ setScreen, today, todayMacros, macroData, saveMacros, setCelebration }) => {
  const [values, setValues] = useState(todayMacros);

  const update = (field, val) => {
    const num = parseInt(val) || 0;
    const updated = { ...values, [field]: num };
    setValues(updated);
    saveMacros({ ...macroData, [today]: updated });
    if (field === 'protein' && num >= MACRO_TARGETS.protein && todayMacros.protein < MACRO_TARGETS.protein) {
      setCelebration({ emoji: '🍗', title: 'PROTEIN HIT!', desc: 'Daily target smashed', xp: null });
      setTimeout(() => setCelebration(null), 2000);
    }
  };

  const quickAdd = (field, amount) => {
    const newVal = (values[field] || 0) + amount;
    const updated = { ...values, [field]: newVal };
    setValues(updated);
    saveMacros({ ...macroData, [today]: updated });
    if (field === 'protein' && newVal >= MACRO_TARGETS.protein && (values.protein || 0) < MACRO_TARGETS.protein) {
      setCelebration({ emoji: '🍗', title: 'PROTEIN HIT!', desc: 'Daily target smashed', xp: null });
      setTimeout(() => setCelebration(null), 2000);
    }
  };

  return (
    <div style={{ padding: '24px 20px' }}>
      <FunHeader emoji="🍽️" title="Fuel Up" subtitle="Hit those macros" />

      <div style={{
        background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
        borderRadius: '24px', padding: '24px', marginBottom: '20px',
        color: '#fff', textAlign: 'center',
        boxShadow: '0 12px 30px rgba(168, 85, 247, 0.3)'
      }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔥</div>
        <div style={{ fontSize: '11px', opacity: 0.9, fontWeight: '800', letterSpacing: '1.5px' }}>TOTAL CALORIES</div>
        <div style={{ fontSize: '52px', fontWeight: '900', letterSpacing: '-2px', lineHeight: '1' }}>
          {values.calories}
        </div>
        <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '600', marginTop: '4px' }}>
          of {MACRO_TARGETS.calories} · {Math.max(0, MACRO_TARGETS.calories - values.calories)} to go
        </div>
      </div>

      <FunMacroInput emoji="🍗" label="Protein" field="protein" value={values.protein} target={MACRO_TARGETS.protein} color="#FF6B6B" bg="#FEE2E2" unit="g" onUpdate={update} onQuickAdd={quickAdd} quickAmounts={[20, 30, 45]} />
      <FunMacroInput emoji="🍚" label="Carbs" field="carbs" value={values.carbs} target={MACRO_TARGETS.carbs} color="#4D96FF" bg="#DBEAFE" unit="g" onUpdate={update} onQuickAdd={quickAdd} quickAmounts={[30, 50, 70]} />
      <FunMacroInput emoji="🥑" label="Fat" field="fat" value={values.fat} target={MACRO_TARGETS.fat} color="#F59E0B" bg="#FEF3C7" unit="g" onUpdate={update} onQuickAdd={quickAdd} quickAmounts={[10, 15, 25]} />
      <FunMacroInput emoji="🥦" label="Fiber" field="fiber" value={values.fiber} target={MACRO_TARGETS.fiber} color="#10B981" bg="#D1FAE5" unit="g" onUpdate={update} onQuickAdd={quickAdd} quickAmounts={[5, 8, 12]} />
      <FunMacroInput emoji="💧" label="Water" field="water" value={values.water} target={MACRO_TARGETS.water} color="#06B6D4" bg="#CFFAFE" unit=" cups" onUpdate={update} onQuickAdd={quickAdd} quickAmounts={[1, 2, 4]} />
      <FunMacroInput emoji="⚡" label="Calories" field="calories" value={values.calories} target={MACRO_TARGETS.calories} color="#A855F7" bg="#F3E8FF" unit="" onUpdate={update} onQuickAdd={quickAdd} quickAmounts={[100, 300, 500]} />
    </div>
  );
};

const FunMacroInput = ({ emoji, label, field, value, target, color, bg, unit, onUpdate, onQuickAdd, quickAmounts }) => {
  const pct = Math.min(100, ((value || 0) / target) * 100);
  const hit = (value || 0) >= target;
  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      padding: '16px',
      marginBottom: '12px',
      border: `2px solid ${hit ? color : bg}`,
      boxShadow: '0 4px 12px rgba(45, 27, 61, 0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: bg, borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
            {emoji}
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '900', color: '#2D1B3D' }}>{label}</div>
            <div style={{ fontSize: '20px', fontWeight: '900', color: hit ? color : '#2D1B3D' }}>
              {value || 0}<span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600' }}>/{target}{unit}</span>
              {hit && <span style={{ fontSize: '14px', marginLeft: '6px' }}>✓</span>}
            </div>
          </div>
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onUpdate(field, e.target.value)}
          style={{
            width: '72px', background: bg,
            border: `2px solid ${color}33`,
            borderRadius: '12px', padding: '8px',
            color: '#2D1B3D', fontSize: '15px', fontWeight: '900',
            outline: 'none', textAlign: 'center'
          }}
        />
      </div>
      <div style={{ height: '8px', background: bg, borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: '4px', transition: 'width 0.4s' }} />
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {quickAmounts.map(a => (
          <button
            key={a}
            onClick={() => onQuickAdd(field, a)}
            style={{
              flex: 1, background: bg, border: 'none',
              borderRadius: '10px', padding: '8px',
              color, fontSize: '12px', fontWeight: '900',
              cursor: 'pointer'
            }}
          >+{a}</button>
        ))}
      </div>
    </div>
  );
};

// ============ PROGRESS ============
const ProgressScreen = ({ setScreen, workoutData, macroData, bodyData, saveBody, unlockedAchievements }) => {
  const [weight, setWeight] = useState('');
  const [bf, setBf] = useState('');
  const [waist, setWaist] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const bodyEntryDates = Object.keys(bodyData).sort().reverse();
  const lastEntry = bodyEntryDates[0];
  const daysSinceLast = lastEntry ? Math.floor((new Date(today) - new Date(lastEntry)) / (1000 * 60 * 60 * 24)) : 999;
  const weighInDue = daysSinceLast >= 7;
  const nextWeighIn = lastEntry ? new Date(new Date(lastEntry).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : today;

  const logBody = () => {
    if (!weight && !bf && !waist) return;
    const entry = { weight: weight || undefined, bf: bf || undefined, waist: waist || undefined };
    saveBody({ ...bodyData, [today]: entry });
    setWeight(''); setBf(''); setWaist('');
  };

  const totalWorkouts = Object.keys(workoutData).length;
  const totalMacroDays = Object.keys(macroData).length;
  const recentEntries = bodyEntryDates.slice(0, 5);

  return (
    <div style={{ padding: '24px 20px' }}>
      <FunHeader emoji="🏆" title="Your Journey" subtitle="The receipts don't lie" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <BigFunStat emoji="💪" value={totalWorkouts} label="WORKOUTS" bg="#FEE2E2" color="#DC2626" />
        <BigFunStat emoji="🍽️" value={totalMacroDays} label="DAYS LOGGED" bg="#FEF3C7" color="#D97706" />
        <BigFunStat emoji="⚖️" value={Object.keys(bodyData).length} label="WEIGH-INS" bg="#DBEAFE" color="#2563EB" />
      </div>

      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 6px 18px rgba(45, 27, 61, 0.08)',
        border: `2px solid ${weighInDue ? '#FFD93D' : '#F1E5F5'}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '22px' }}>📏</div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '900' }}>
                {weighInDue ? '⭐ Weigh-In Due!' : 'Weekly Weigh-In'}
              </div>
              <div style={{ fontSize: '12px', color: '#6B21A8', fontWeight: '700', marginTop: '2px' }}>
                {weighInDue ? 'Time to log your stats' : `Next: ${nextWeighIn}`}
              </div>
            </div>
          </div>
          <div style={{
            background: weighInDue ? 'linear-gradient(135deg, #FFD93D, #FFA94D)' : '#F3E8FF',
            color: weighInDue ? '#2D1B3D' : '#A855F7',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '10px', fontWeight: '900', letterSpacing: '1px'
          }}>WEEKLY</div>
        </div>

        {weighInDue && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <FunBodyInput emoji="⚖️" label="WEIGHT" placeholder="lb" value={weight} onChange={setWeight} bg="#DBEAFE" color="#2563EB" />
              <FunBodyInput emoji="📊" label="BF %" placeholder="%" value={bf} onChange={setBf} bg="#FEF3C7" color="#D97706" />
              <FunBodyInput emoji="📐" label="WAIST" placeholder="in" value={waist} onChange={setWaist} bg="#F3E8FF" color="#7C3AED" />
            </div>
            <button
              onClick={logBody}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                border: 'none', borderRadius: '14px',
                padding: '14px', color: '#fff',
                fontSize: '14px', fontWeight: '900',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(168, 85, 247, 0.3)'
              }}
            >+ SAVE ENTRY</button>
          </>
        )}

        {!weighInDue && lastEntry && (
          <div style={{ background: '#F9FAFB', borderRadius: '12px', padding: '12px', marginTop: '8px' }}>
            <div style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '900', letterSpacing: '1px', marginBottom: '6px' }}>LAST ENTRY · {lastEntry}</div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '14px', fontWeight: '900', color: '#2D1B3D' }}>
              {bodyData[lastEntry].weight && <span>⚖️ {bodyData[lastEntry].weight}lb</span>}
              {bodyData[lastEntry].bf && <span>📊 {bodyData[lastEntry].bf}%</span>}
              {bodyData[lastEntry].waist && <span>📐 {bodyData[lastEntry].waist}in</span>}
            </div>
          </div>
        )}
      </div>

      {recentEntries.length > 1 && (
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 6px 18px rgba(45, 27, 61, 0.08)',
          border: '2px solid #F1E5F5'
        }}>
          <div style={{ fontSize: '13px', fontWeight: '900', color: '#6B21A8', marginBottom: '12px' }}>📈 RECENT ENTRIES</div>
          {recentEntries.map(date => (
            <div key={date} style={{
              display: 'flex', justifyContent: 'space-between', padding: '12px 0',
              borderTop: '2px dashed #F1E5F5', fontSize: '13px', fontWeight: '700'
            }}>
              <div style={{ color: '#9CA3AF' }}>{date}</div>
              <div style={{ display: 'flex', gap: '14px', color: '#2D1B3D' }}>
                {bodyData[date].weight && <span>⚖️ {bodyData[date].weight}lb</span>}
                {bodyData[date].bf && <span>📊 {bodyData[date].bf}%</span>}
                {bodyData[date].waist && <span>📐 {bodyData[date].waist}in</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        background: '#fff', borderRadius: '20px', padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 6px 18px rgba(45, 27, 61, 0.08)',
        border: '2px solid #FEF3C7'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Trophy size={18} color="#F59E0B" />
          <div style={{ fontSize: '15px', fontWeight: '900' }}>Achievements</div>
          <div style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: '800', color: '#F59E0B' }}>
            {unlockedAchievements.length}/{ACHIEVEMENTS.length}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {ACHIEVEMENTS.map(a => {
            const unlocked = unlockedAchievements.find(u => u.id === a.id);
            return (
              <div key={a.id} style={{
                background: unlocked ? 'linear-gradient(135deg, #FFD93D, #FFA94D)' : '#F1E5F5',
                borderRadius: '14px', padding: '12px',
                opacity: unlocked ? 1 : 0.5,
                filter: unlocked ? 'none' : 'grayscale(0.6)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{a.emoji}</div>
                <div style={{ fontSize: '11px', fontWeight: '900', color: '#2D1B3D' }}>{a.name}</div>
                <div style={{ fontSize: '10px', color: '#6B21A8', fontWeight: '600', marginTop: '2px' }}>{a.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BigFunStat = ({ emoji, value, label, bg, color }) => (
  <div style={{
    background: bg, borderRadius: '18px', padding: '14px',
    textAlign: 'center', border: `2px solid ${color}22`
  }}>
    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{emoji}</div>
    <div style={{ fontSize: '22px', fontWeight: '900', color }}>{value}</div>
    <div style={{ fontSize: '9px', fontWeight: '800', color, letterSpacing: '1px', marginTop: '2px' }}>{label}</div>
  </div>
);

const FunBodyInput = ({ emoji, label, placeholder, value, onChange, bg, color }) => (
  <div style={{ background: bg, borderRadius: '14px', padding: '10px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
      <div style={{ fontSize: '14px' }}>{emoji}</div>
      <div style={{ fontSize: '9px', fontWeight: '900', color, letterSpacing: '1px' }}>{label}</div>
    </div>
    <input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', background: '#fff',
        border: 'none', borderRadius: '8px',
        padding: '8px', color: '#2D1B3D',
        fontSize: '14px', fontWeight: '900',
        outline: 'none', textAlign: 'center',
        boxSizing: 'border-box'
      }}
    />
  </div>
);

const FunHeader = ({ emoji, title, subtitle }) => (
  <div style={{ marginBottom: '24px' }}>
    <div style={{ fontSize: '40px', marginBottom: '4px' }}>{emoji}</div>
    <h1 style={{ fontSize: '30px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1', color: '#2D1B3D', margin: 0 }}>{title}</h1>
    <div style={{ fontSize: '14px', color: '#6B21A8', fontWeight: '700', marginTop: '4px' }}>{subtitle}</div>
  </div>
);

const BottomNav = ({ screen, setScreen }) => {
  const items = [
    { id: 'home', emoji: '🏠', label: 'Home' },
    { id: 'workout', emoji: '🏋️', label: 'Train' },
    { id: 'macros', emoji: '🍽️', label: 'Fuel' },
    { id: 'progress', emoji: '🏆', label: 'Stats' }
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '2px solid #FFE5EC',
      padding: '12px 0 20px', zIndex: 10,
      boxShadow: '0 -4px 20px rgba(45, 27, 61, 0.08)'
    }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', justifyContent: 'space-around' }}>
        {items.map(item => {
          const active = screen === item.id || (item.id === 'workout' && screen === 'workoutDetail');
          return (
            <div
              key={item.id}
              onClick={() => setScreen(item.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                cursor: 'pointer',
                opacity: active ? 1 : 0.5,
                transform: active ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: '22px' }}>{item.emoji}</div>
              <div style={{ fontSize: '10px', fontWeight: '900', color: '#2D1B3D', letterSpacing: '0.5px' }}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingApp;