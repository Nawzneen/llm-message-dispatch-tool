#!/bin/bash

# Usage: ./export_sonarqube_issues.sh <token> <component> <output_path>

TOKEN=$1
COMPONENT=$2
OUTPUT_PATH=$3
CATEGORY=$4

if [ -z "$TOKEN" ] || [ -z "$COMPONENT" ]  || [ -z "$OUTPUT_PATH" ] || [ -z "$CATEGORY" ]; then
  echo "Usage: $0 <token> <component> <output_path> <category (hotspots/complexity-trend/technical-debt)>"
  exit 1
fi

DATETIME=$(date +"%Y%m%d_%H%M%S")
FILENAME="${DATETIME}_codescene_${COMPONENT}.json"

echo "${OUTPUT_PATH}/${FILENAME}"

curl -H "Authorization: Bearer ${TOKEN}" "http://localhost:3003/api/v2/projects/2/analyses/2" \
  -o "${OUTPUT_PATH}/${FILENAME}"

if [ $? -eq 0 ]; then
  echo "Report exported successfully to ${FILENAME}"
else
  echo "Failed to export report."
fi