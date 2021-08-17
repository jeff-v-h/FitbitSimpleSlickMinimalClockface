# Fitbit Simple Slick Minimal Clockface

My own clockface for the Fitbit Versa 3 smart watch.

## Requirements

- Fitbit user account
- Fitbit OS device or Fitbit OS Simulator
- latest Fitbit mobile application
- Node.js 8.x+

## Development

1. `npm install`
2. Enter fitbit shell.

```CLI
npx fitbit-build
npx fitbit
```

3. Build and install in one go `fitbit$ bi` (alternatively call `build` first then `install`).

## Testing

Instructions based off of Versa 3

1. Connect watch to laptop/computer
2. On watch, go to settings > Developer bridge > Enable
3. On fitbit app on phone, click profile pic to go to account (top left corner at time of writing) > Device (Versa 3) > Developer Menu (under Developer sub-heading) > enable 'Developer Bridge' toggle
4. Go on command line and follow the steps in Development section above. `build` and `install` should install onto device. Settings can be accessed on the Developer Menu page.

## Author

Jeffrey Huang: jeffvh@outlook.com
