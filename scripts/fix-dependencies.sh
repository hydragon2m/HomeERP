#!/bin/bash
cd /vercel/share/v0-project/frontend
echo "Removing outdated package-lock.json..."
rm -f package-lock.json
echo "Regenerating package-lock.json..."
npm install
echo "Dependencies fixed successfully!"
