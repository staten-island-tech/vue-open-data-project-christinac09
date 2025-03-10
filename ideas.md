## Arrest Data

**Example of one Object:**

```Javascript
{
    "arrest_key": "281369711",
    "arrest_date": "2024-01-30T00:00:00.000",
    "pd_cd": "177",
    "pd_desc": "SEXUAL ABUSE",
    "ky_cd": "116",
    "ofns_desc": "SEX CRIMES",
    "law_code": "PL 1306501",
    "law_cat_cd": "F",
    "arrest_boro": "M",
    "arrest_precinct": "25",
    "jurisdiction_code": "0",
    "age_group": "25-44",
    "perp_sex": "M",
    "perp_race": "BLACK",
    "x_coord_cd": "1000558",
    "y_coord_cd": "231080",
    "latitude": "40.8009303727402",
    "longitude": "-73.9410982410066",
    "geocoded_column": {
      "type": "Point",
      "coordinates": [-73.9410982410066, 40.8009303727402]
    },
    ":@computed_region_f5dn_yrer": "7",
    ":@computed_region_yeji_bk3q": "4",
    ":@computed_region_92fq_4b7q": "36",
    ":@computed_region_sbqj_enih": "16",
    ":@computed_region_efsh_h5xi": "13093"
  }
```

can sort by:

- race
- sex
- borough
- age group
- year
- type of crime

chart ideas:

- bar chart - # crimes per year?
- pie chart for % of race/age/sex for diff crimes
-
