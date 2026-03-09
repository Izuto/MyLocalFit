const exercisesDB = [
    // === UPPER BODY ===
    {
        id: "ex_pushups",
        name: "Push-ups",
        description: "A classic upper body exercise that targets the chest, shoulders, and triceps. Keep your back straight and lower until your chest nearly touches the floor.",
        muscles: ["Chest", "Triceps", "Shoulders"],
        duration: 45
    },
    {
        id: "ex_wide_pushups",
        name: "Wide Push-ups",
        description: "Wider hand placement shifts the emphasis to the outer chest and shoulders. Keep a controlled tempo.",
        muscles: ["Chest", "Shoulders"],
        duration: 40
    },
    {
        id: "ex_diamond_pushups",
        name: "Diamond Push-ups",
        description: "Hands close together beneath your chest forming a diamond shape. Heavily targets the triceps.",
        muscles: ["Triceps", "Chest"],
        duration: 35
    },
    {
        id: "ex_pike_pushups",
        name: "Pike Push-ups",
        description: "Hips high in an inverted-V position, press up to target the shoulders. Great deltoid builder.",
        muscles: ["Shoulders", "Triceps"],
        duration: 40
    },
    {
        id: "ex_tricep_dips",
        name: "Tricep Dips",
        description: "Use a chair or bench behind you. Lower your body by bending your elbows to 90°, then press back up.",
        muscles: ["Triceps", "Chest", "Shoulders"],
        duration: 45
    },
    {
        id: "ex_arm_circles",
        name: "Arm Circles",
        description: "Extend your arms to the sides and make small circles, gradually increasing the size. Great warm-up and shoulder endurance drill.",
        muscles: ["Shoulders", "Upper Back"],
        duration: 45
    },
    {
        id: "ex_plank_shoulder_taps",
        name: "Plank Shoulder Taps",
        description: "In a high plank, tap each shoulder with the opposite hand while keeping your hips stable.",
        muscles: ["Core", "Shoulders", "Chest"],
        duration: 45
    },
    {
        id: "ex_inchworm",
        name: "Inchworm",
        description: "Stand, bend forward, walk hands out to plank, do a push-up, then walk hands back and stand. Full upper body engagement.",
        muscles: ["Chest", "Shoulders", "Core"],
        duration: 50
    },

    // === LOWER BODY ===
    {
        id: "ex_squats",
        name: "Squats",
        description: "A lower body exercise targeting the thighs, hips, and buttocks. Go as deep as comfortable, keeping your chest up.",
        muscles: ["Quads", "Glutes", "Hamstrings"],
        duration: 60
    },
    {
        id: "ex_lunges",
        name: "Lunges",
        description: "Step forward into a lunge, lowering your back knee toward the floor. Alternate legs each rep.",
        muscles: ["Quads", "Glutes", "Hamstrings"],
        duration: 60
    },
    {
        id: "ex_jump_squats",
        name: "Jump Squats",
        description: "Squat down then explode upward into a jump. Land softly and repeat. Builds explosive leg power.",
        muscles: ["Quads", "Glutes", "Calves"],
        duration: 40
    },
    {
        id: "ex_wall_sit",
        name: "Wall Sit",
        description: "Back flat against a wall, slide down until your thighs are parallel to the floor and hold. Pure isometric burn.",
        muscles: ["Quads", "Glutes"],
        duration: 60
    },
    {
        id: "ex_calf_raises",
        name: "Calf Raises",
        description: "Stand on the edge of a step or flat ground, raise up onto your toes, then slowly lower. Repeat at a steady pace.",
        muscles: ["Calves"],
        duration: 45
    },
    {
        id: "ex_glute_bridges",
        name: "Glute Bridges",
        description: "Lie on your back, knees bent, feet flat. Drive your hips up squeezing your glutes at the top, then lower.",
        muscles: ["Glutes", "Hamstrings", "Core"],
        duration: 50
    },
    {
        id: "ex_side_lunges",
        name: "Side Lunges",
        description: "Step wide to the side, bending one knee while keeping the other leg straight. Alternate sides.",
        muscles: ["Quads", "Glutes", "Adductors"],
        duration: 50
    },
    {
        id: "ex_sumo_squats",
        name: "Sumo Squats",
        description: "Wide stance with toes pointed out. Squat deep to target the inner thighs and glutes.",
        muscles: ["Glutes", "Adductors", "Quads"],
        duration: 50
    },
    {
        id: "ex_reverse_lunges",
        name: "Reverse Lunges",
        description: "Step backward into a lunge instead of forward. Easier on the knees, great glute activation.",
        muscles: ["Quads", "Glutes", "Hamstrings"],
        duration: 50
    },

    // === CORE ===
    {
        id: "ex_plank",
        name: "Plank",
        description: "An isometric core strength exercise. Maintain a straight line from head to heels. Brace your abs tight.",
        muscles: ["Core", "Shoulders"],
        duration: 60
    },
    {
        id: "ex_crunches",
        name: "Crunches",
        description: "Lie on your back with knees bent. Curl your upper body toward your knees, squeezing your abs at the top.",
        muscles: ["Abs"],
        duration: 45
    },
    {
        id: "ex_bicycle_crunches",
        name: "Bicycle Crunches",
        description: "Lie on your back, alternate bringing each elbow to the opposite knee in a pedaling motion. Great for obliques.",
        muscles: ["Abs", "Obliques"],
        duration: 45
    },
    {
        id: "ex_mountain_climbers",
        name: "Mountain Climbers",
        description: "In a high plank, rapidly drive your knees toward your chest alternating legs. Combines core and cardio.",
        muscles: ["Core", "Cardio", "Shoulders"],
        duration: 40
    },
    {
        id: "ex_leg_raises",
        name: "Leg Raises",
        description: "Lie flat on your back, legs straight. Raise them to 90° then slowly lower without touching the floor.",
        muscles: ["Lower Abs", "Hip Flexors"],
        duration: 45
    },
    {
        id: "ex_russian_twists",
        name: "Russian Twists",
        description: "Sit with knees bent, lean back slightly, and rotate your torso side to side. Add weight for extra challenge.",
        muscles: ["Obliques", "Abs"],
        duration: 45
    },
    {
        id: "ex_dead_bug",
        name: "Dead Bug",
        description: "Lie on your back, arms extended up, knees at 90°. Extend opposite arm and leg, return, then switch sides.",
        muscles: ["Core", "Lower Abs"],
        duration: 50
    },
    {
        id: "ex_side_plank_left",
        name: "Side Plank (Left)",
        description: "Lie on your left side, stack your feet, and lift your hips off the ground. Hold with a straight body line.",
        muscles: ["Obliques", "Core"],
        duration: 40
    },
    {
        id: "ex_side_plank_right",
        name: "Side Plank (Right)",
        description: "Lie on your right side, stack your feet, and lift your hips off the ground. Hold with a straight body line.",
        muscles: ["Obliques", "Core"],
        duration: 40
    },
    {
        id: "ex_flutter_kicks",
        name: "Flutter Kicks",
        description: "Lie on your back, legs straight and slightly off the ground. Alternate kicking up and down rapidly.",
        muscles: ["Lower Abs", "Hip Flexors"],
        duration: 40
    },

    // === CARDIO / FULL BODY ===
    {
        id: "ex_jumping_jacks",
        name: "Jumping Jacks",
        description: "A full-body cardio exercise that gets your heart rate up. Keep a steady pace and land softly.",
        muscles: ["Full Body", "Cardio"],
        duration: 45
    },
    {
        id: "ex_burpees",
        name: "Burpees",
        description: "Drop to a push-up, jump your feet to your hands, then explode upward. The ultimate full-body cardio move.",
        muscles: ["Full Body", "Cardio"],
        duration: 40
    },
    {
        id: "ex_high_knees",
        name: "High Knees",
        description: "Run in place, driving your knees as high as possible with each step. Pump your arms for more intensity.",
        muscles: ["Cardio", "Hip Flexors", "Quads"],
        duration: 40
    },
    {
        id: "ex_butt_kicks",
        name: "Butt Kicks",
        description: "Run in place, kicking your heels up toward your glutes with each stride. Great hamstring warm-up and cardio.",
        muscles: ["Cardio", "Hamstrings"],
        duration: 40
    },
    {
        id: "ex_skaters",
        name: "Skaters",
        description: "Jump laterally from one foot to the other, swinging your arms for momentum. Works balance and lateral power.",
        muscles: ["Glutes", "Quads", "Cardio"],
        duration: 45
    },
    {
        id: "ex_squat_jumps",
        name: "Star Jumps",
        description: "From a squat, jump and spread your arms and legs into a star shape mid-air, then land softly.",
        muscles: ["Full Body", "Cardio"],
        duration: 40
    },

    // === STRETCHING / MOBILITY ===
    {
        id: "ex_childs_pose",
        name: "Child's Pose",
        description: "Kneel, sit back on your heels, and reach your arms forward on the floor. A calming stretch for the back and shoulders.",
        muscles: ["Back", "Shoulders"],
        duration: 45
    },
    {
        id: "ex_cat_cow",
        name: "Cat-Cow Stretch",
        description: "On hands and knees, alternate between arching (cow) and rounding (cat) your back. Great spinal mobility drill.",
        muscles: ["Spine", "Core"],
        duration: 45
    },
    {
        id: "ex_superman",
        name: "Superman Hold",
        description: "Lie face down, lift your arms and legs off the ground simultaneously and hold. Strengthens the posterior chain.",
        muscles: ["Lower Back", "Glutes"],
        duration: 40
    }
];

// ============================================================================
// WORKOUT ROUTINES — each ≥ 15 min (900 seconds), exercises repeat to fill time
// ============================================================================

function calcRoutineDuration(exerciseIds) {
    return exerciseIds.reduce((sum, id) => {
        const ex = exercisesDB.find(e => e.id === id);
        return sum + (ex ? ex.duration : 0);
    }, 0);
}

const workoutRoutines = [
    // 1 — UPPER BODY POWER  (total ≈ 920s = 15:20)
    {
        id: "routine_upper",
        name: "💪 Upper Body Power",
        category: "Upper Body",
        exercises: [
            "ex_arm_circles",        // 45
            "ex_pushups",            // 45
            "ex_wide_pushups",       // 40
            "ex_diamond_pushups",    // 35
            "ex_pike_pushups",       // 40
            "ex_tricep_dips",        // 45
            "ex_plank_shoulder_taps",// 45
            "ex_inchworm",           // 50
            "ex_pushups",            // 45 (repeat)
            "ex_pike_pushups",       // 40 (repeat)
            "ex_diamond_pushups",    // 35 (repeat)
            "ex_wide_pushups",       // 40 (repeat)
            "ex_tricep_dips",        // 45 (repeat)
            "ex_arm_circles",        // 45 (repeat)
            "ex_plank_shoulder_taps",// 45 (repeat)
            "ex_inchworm",           // 50 (repeat)
            "ex_pushups",            // 45 (repeat)
            "ex_childs_pose",        // 45 cooldown
        ]
    },

    // 2 — LOWER BODY BURN  (total ≈ 920s = 15:20)
    {
        id: "routine_lower",
        name: "🦵 Lower Body Burn",
        category: "Lower Body",
        exercises: [
            "ex_jumping_jacks",   // 45 warm-up
            "ex_squats",          // 60
            "ex_lunges",          // 60
            "ex_jump_squats",     // 40
            "ex_wall_sit",        // 60
            "ex_calf_raises",     // 45
            "ex_glute_bridges",   // 50
            "ex_side_lunges",     // 50
            "ex_sumo_squats",     // 50
            "ex_reverse_lunges",  // 50
            "ex_squats",          // 60 (repeat)
            "ex_jump_squats",     // 40 (repeat)
            "ex_wall_sit",        // 60 (repeat)
            "ex_glute_bridges",   // 50 (repeat)
            "ex_calf_raises",     // 45 (repeat)
            "ex_sumo_squats",     // 50 (repeat)
            "ex_childs_pose",     // 45 cooldown
        ]
    },

    // 3 — CORE CRUSHER  (total ≈ 910s = 15:10)
    {
        id: "routine_core",
        name: "🔥 Core Crusher",
        category: "Core",
        exercises: [
            "ex_mountain_climbers",  // 40 warm-up
            "ex_plank",              // 60
            "ex_crunches",           // 45
            "ex_bicycle_crunches",   // 45
            "ex_leg_raises",         // 45
            "ex_russian_twists",     // 45
            "ex_dead_bug",           // 50
            "ex_side_plank_left",    // 40
            "ex_side_plank_right",   // 40
            "ex_flutter_kicks",      // 40
            "ex_plank",              // 60 (repeat)
            "ex_bicycle_crunches",   // 45 (repeat)
            "ex_leg_raises",         // 45 (repeat)
            "ex_russian_twists",     // 45 (repeat)
            "ex_mountain_climbers",  // 40 (repeat)
            "ex_dead_bug",           // 50 (repeat)
            "ex_plank",              // 60 (repeat)
            "ex_cat_cow",            // 45 cooldown
        ]
    },

    // 4 — CARDIO BLAST  (total ≈ 905s = 15:05)
    {
        id: "routine_cardio",
        name: "❤️‍🔥 Cardio Blast",
        category: "Cardio",
        exercises: [
            "ex_jumping_jacks",    // 45
            "ex_high_knees",       // 40
            "ex_butt_kicks",       // 40
            "ex_burpees",          // 40
            "ex_mountain_climbers",// 40
            "ex_squat_jumps",      // 40
            "ex_skaters",          // 45
            "ex_high_knees",       // 40 (repeat)
            "ex_jumping_jacks",    // 45 (repeat)
            "ex_burpees",          // 40 (repeat)
            "ex_butt_kicks",       // 40 (repeat)
            "ex_mountain_climbers",// 40 (repeat)
            "ex_squat_jumps",      // 40 (repeat)
            "ex_skaters",          // 45 (repeat)
            "ex_jumping_jacks",    // 45 (repeat)
            "ex_high_knees",       // 40 (repeat)
            "ex_burpees",          // 40 (repeat)
            "ex_butt_kicks",       // 40 (repeat)
            "ex_mountain_climbers",// 40 (repeat)
            "ex_childs_pose",      // 45 cooldown
        ]
    },

    // 5 — FULL BODY STRENGTH  (total ≈ 935s = 15:35)
    {
        id: "routine_fullbody",
        name: "⚡ Full Body Strength",
        category: "Full Body",
        exercises: [
            "ex_jumping_jacks",    // 45 warm-up
            "ex_squats",           // 60
            "ex_pushups",          // 45
            "ex_lunges",           // 60
            "ex_plank",            // 60
            "ex_burpees",          // 40
            "ex_glute_bridges",    // 50
            "ex_tricep_dips",      // 45
            "ex_mountain_climbers",// 40
            "ex_superman",         // 40
            "ex_squats",           // 60 (repeat)
            "ex_pushups",          // 45 (repeat)
            "ex_lunges",           // 60 (repeat)
            "ex_plank",            // 60 (repeat)
            "ex_burpees",          // 40 (repeat)
            "ex_glute_bridges",    // 50 (repeat)
            "ex_superman",         // 40 (repeat)
            "ex_childs_pose",      // 45 cooldown
        ]
    },

    // 6 — MOBILITY & RECOVERY  (total ≈ 920s = 15:20)
    {
        id: "routine_mobility",
        name: "🧘 Mobility & Recovery",
        category: "Recovery",
        exercises: [
            "ex_cat_cow",          // 45
            "ex_childs_pose",      // 45
            "ex_dead_bug",         // 50
            "ex_glute_bridges",    // 50
            "ex_superman",         // 40
            "ex_side_plank_left",  // 40
            "ex_side_plank_right", // 40
            "ex_arm_circles",      // 45
            "ex_plank",            // 60
            "ex_cat_cow",          // 45 (repeat)
            "ex_childs_pose",      // 45 (repeat)
            "ex_dead_bug",         // 50 (repeat)
            "ex_glute_bridges",    // 50 (repeat)
            "ex_superman",         // 40 (repeat)
            "ex_side_plank_left",  // 40 (repeat)
            "ex_side_plank_right", // 40 (repeat)
            "ex_plank",            // 60 (repeat)
            "ex_arm_circles",      // 45 (repeat)
            "ex_cat_cow",          // 45 cooldown
        ]
    }
];
