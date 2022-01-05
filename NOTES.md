IMPSIM TODO

# PLAYABLE STATE

-- Once these have been done, start filling in chains
-- Empire panel just needs to show the count for each stat thats it
--

# Debugger

-- Needs to show entire store
-- Make sidebar rather than center, like the RFH one
-- Multiple views: expandable store dropdown, actions for testing
-- Possibly show framerate/number of redraws?

# Structures

-- Add cases for adding/removing 5/10
-- Add upgrades to each structure
-- Add a Freeze visual state
-- Refine the unbuilt visual state
-- Add a building constructed/demolished visual toast
-- Add a pulse/fade effect on number state change

# Census

-- This page shows every citizen of the empire.
-- Citizen types: unemployed, worker, soldier, hero, noble
-- Worker: this citizen is assigned to structures and perform jobs.
-- Soldier: these soldiers are trainable and sit in military reserve or are sent on raids
-- Hero: these heroes are equipped with spells and abilities are are sent on quests
-- Noble: nobles are sent on diplomatic missions, and provide empire boosts etc according to their status
-- Workers will form the bulk of the census until late game, afer which it will be soldiers

# Message

-- The message bus will control the whole app, not just game events. Only a single stream will be used for visible game events. Bugs and stuff should also come out through it.

# Global Effects / Modifiers

-- In the top right, global timed effects need to be visible.
-- Global Modifiers are timed modifiers that affect a list of targets with their effect. Examples include "Reduce production" which targets jobs and reduces overall product by a %, or "Famine" which randomly deletes food stores or debuffs random food structures
-- Modifiers are flat

# Research

-- Use the modifier class
-- Has it's own resource etc

# FOOD

> Option 1
> -- Multiple resources with type FOOD
> -- All food is edible, but contributes a different value per food
> -- Food build chains
> -- Food quality levels can be set per Citizen
> -- Each day, a citizen consumes X per his level

> -- To lower complexity, stuff like bakers will produce a range of goods if the ingredients are available
> -- rather than having "pastry chef" "baker" "chef" "butcher"

> Each structure has multiple jobs
> Each job can have multiple citizens assigned
> Each job has a product per second. If a product per second is less than 0, then it takes longer than a second to complete job.
> Each job has a consumption per second. Per completion, a set amount of consumption occurs. If a product has a greater-than-second duration, then consumption targets must be met for each tick. If resources fall below consumption target, production halts.
> No progress bars
> Jobs are set to a desired capacity. if a citizen dies, another will take its place. If no citizens are available to take place, Job will display an error. Citizens are assigned in the normal tick cycle. Which means if population can handle capacity, no production will be affected.
> Each active worker multiplies the per tick outcome.
> Because each tick is 1 second, citizens can be added or taken away without affecting product status
> Count dictates job capacity in most cases. A count of 3 allows for 3 workers per job, unless specified otherwise.
> If output box overflows, click to revela total output
> Structures can have either/or upgrades that come in pairs and lock the other out
