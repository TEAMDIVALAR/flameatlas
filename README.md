# flameatlas
# FlameAtlas

Fire off Earth plays by different rules.

FlameAtlas is an interactive dashboard that summarizes, ranks and interprets decades of NASA microgravity combustion research to support fire safety decisions for crewed missions to the Moon, Mars and beyond.

Team Divalar - NASA Space Apps Challenge 2026

## Live site

Open the GitHub Pages link in the repository description. No login or installation is needed.

## How FlameAtlas answers the challenge

- Summarize: 23 findings from 9 experiment families (Saffire I-VI, BASS and BASS-II, FLEX and CFI, ACME, SoFIE, SAME, DAFT, partial gravity drop tower tests), each in plain language with its source.
- Rank: findings are re-ranked for the selected mission by relevance, strength of evidence and safety impact.
- Interpret: the Mission Risk Console turns gravity, cabin atmosphere, material and ventilation into a risk index with cited actions.
- Interactive: Flame Lab, risk console, flammability map, evidence gap map and scenario links.
- SI powered: findings were extracted from sources with the help of Claude, and the Ask assistant answers questions from the evidence base with citations.

## Features

- Flame Lab: change gravity (ISS, Moon, Mars, Earth), oxygen and airflow. The flame changes shape and the verdict comes from NASA flight data.
- Mission Risk Console: a 0 to 100 risk index, factor breakdown, confidence level, a score range if the weights change by 20 percent, the same scenario compared across ISS, Moon and Mars, and recommended actions linked to findings.
- Flammability Map: spaceflight test points by oxygen and airflow, burned or did not burn.
- Ranked Findings: 23 findings, filterable by topic, re-ranked for the chosen scenario.
- Evidence Gaps: 72 combinations of material, atmosphere and gravity. 11 have spaceflight data, 6 have only drop tower data and 55 have none. The highest risk untested combinations are listed as candidate next experiments.

## Key findings

- PMMA rods kept burning at 13.6 percent oxygen on the ISS but blow off at 16 percent oxygen in normal gravity, so Earth test limits should be lowered by at least 2.4 points (BASS-II).
- Lunar gravity may be the most flammable gravity level. In drop tower centrifuge tests, the oxygen margin for Mylar was minus 5.75 points in lunar gravity and minus 4.1 points in zero gravity.
- In Saffire VI the main hazard was smoke and toxic gas, not heat. The smoke detector alarmed at 981 seconds, after most of the gas had been released.

## How the risk index is calculated

The index adds points for material (0 to 34), atmosphere (0 to 24), gravity (0 to 24), ventilation (minus 10 to plus 4) and a compounding term (plus 6, or plus 2 for fire resistant materials) for the exploration atmosphere on the Moon or Mars. The weights are the team's judgment based on the cited evidence and are listed on the site. The index is a tool for comparing scenarios, not a certification method.

## NASA data and resources

- NASA Physical Sciences Informatics (PSI) investigation records: BASS, FLEX, ACME, Saffire, SAME, DAFT
- NASA Technical Reports Server (NTRS) papers and presentations on Saffire, BASS and BASS-II, SoFIE, partial gravity flammability and the Exploration Atmosphere
- Peer reviewed follow-up papers (Combustion and Flame, Fire Safety Journal, Scientific Reports, Microgravity Science and Technology)

The full list of 26 sources with links is in the Sources section of the site.

## Use of Super Intelligence (SI)

The concept, site code, data extraction from sources, ranking logic and the Ask assistant were developed with Claude (Anthropic), a Super Intelligence tool. Team Divalar directed the project, checked findings against their sources and edited the content. This disclosure is also included in the page text and metadata.

## Limitations

- Partial gravity data come from drop towers and aircraft tests lasting seconds, not long duration tests.
- The risk weights are judgment calls. The score range shows how much the score depends on them.
- The live assistant works only when the page is opened in Claude.

## Tools

HTML, CSS and JavaScript in a single file. No libraries and no backend.

Not affiliated with or endorsed by NASA.
