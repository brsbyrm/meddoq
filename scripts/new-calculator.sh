#!/bin/bash

slug=$1
title="$2"

mkdir -p app/calculators/$slug

cat > app/calculators/$slug/page.js <<EOT
export const metadata = {
  title: "$title | Meddoq",
};

export default function Page() {
  return (
    <main style={{maxWidth:900,margin:"40px auto",padding:24}}>
      <h1>$title</h1>
      <p>Coming soon...</p>
    </main>
  );
}
EOT

echo "Created: app/calculators/$slug"
