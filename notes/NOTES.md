1. Create SLICE with an initial state
2. Export individual reducers as slice.actions
3. Export the who reducer as slice.reducer (default)
4. Import the reducer to the STORE and add to combineReducer
5. Add combined reducer to configureStore
6. IN REACT, import useDispatch * useSelector to access Store
7. Import individual slice reducers as { reducer, reducer } from slice
8. Bind dispatch to useDispatch
9. Bind state to useSelector's reducer 

RENDER PROPS
https://duckduckgo.com/?q=Unterminated%20regular%20expression%20literal.&t=vivaldi

TYPE SAFTEY FOR HOOKS
https://dev.to/sarimarton/easy-type-safety-with-usedispatch-and-useselector-4fii

ESLINT NO UNUSED VARS ERROR
https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript

FIX JSX ERROR 
https://stackoverflow.com/questions/64965203/cannot-use-jsx-unless-the-jsx-flag-is-provided-when-jsx-is-react-jsx

CSS FILTERS
https://codepen.io/sosuke/pen/Pjoqqp

# TODO
# centre panel
> "new" icon when tabs become available, hidden otherwise to increase suspense
 
# seasons 
> seasons are part of events and affect product etc

# conceptual
> Understanding typesaftey for hooks

# refactor
> fix structure type with new object merge syntax

# demo
> demographic logic, birth, dirth, age, 
> WorkerAssignment / auto-deassign with death 

# messaging
> Add more message types

# storage
> design storage mechanics

# resbox
> fix icons
> REDO ENTIRE RESOURCE CHAIN

# events
> Slice, Container, Component
> each event an icon, applying some modifier to global stats for a duration

# THEN...
> thats Version 1 complete!

# THINGS TO THIK ABOUT
> How can I use equality checks to improve performance?
> How can I better assess performance?

# FLOW
> STORE > CONTAINER > COMPONENT
> All logic should be calculated in container. 
> Components should only call dispatches via handlers.


# [[HOW JOBS WORK]]
TYPE: CONTINUOUS (SHORT)
> Assign 1 worker to job with duration 1
> Job completes once each day
> Assign 2 more workers
> Job produces 3x output (completes 3 times)

TYPE: CONTINUOUS (MED)
> Assign 1 worker to job with duration 5
> Job completes after 5 days
> Assign 2 more 
> Assignment only takes place after current job completes
> Next job has 3 assigned to it
> Completes with 3x output
