#!/bin/bash

# Usage: ./export_sonarqube_issues.sh <token> <component> <output_path>

TOKEN=$1
COMPONENT=$2
OUTPUT_PATH=$3

if [ -z "$TOKEN" ] || [ -z "$COMPONENT" ]; then
  echo "Usage: $0 <token> <component> <output_path>"
  exit 1
fi

DATETIME=$(date +"%Y%m%d_%H%M%S")
FILENAME="${DATETIME}_SonarQube_${COMPONENT}.json"

echo "${OUTPUT_PATH}/${FILENAME}"

curl -s -u "${TOKEN}:" "http://localhost:9000/api/issues/search?componentKeys=${COMPONENT}&ps=500&p=1" \
  -o "${OUTPUT_PATH}/${FILENAME}"

if [ $? -eq 0 ]; then
  echo "Report exported successfully to ${FILENAME}"
else
  echo "Failed to export report."
fi