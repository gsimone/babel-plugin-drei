# babel-plugin-drei

Transform `drei` named imports to default imports
```jsx
import { Box, Sphere } from "drei"
```
into default imports:
```jsx
import Box from "drei/lib/Box"
import Sphere from "drei/lib/Sphere"
```

### Usage

```json
{
  "plugins": [
    ["drei"]
  ]
}
```

#### Sources

- https://github.com/jamiebuilds/babel-handbook
- https://github.com/lodash/babel-plugin-lodash
- https://bitbucket.org/amctheatres/babel-transform-imports/src/master/
