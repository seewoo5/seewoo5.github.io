import pandas as pd


if __name__ == "__main__":
    new_lines = []
    with open("attendance.csv") as f:
        lines = f.readlines()
        new_lines.append(lines[0])
        for line in lines[1:]:
            new_lines.append(line[:-4])
    with open("attendance_new.csv", "w") as wf:
        wf.write(new_lines[0])
        for line in new_lines[1:]:
            wf.write(line + "\n")

    weeks = [
        ("2023-08-29", "2023-08-31"),
        ("2023-09-05", "2023-09-07"),
        ("2023-09-12", "2023-09-14"),
        ("2023-09-19", "2023-09-21"),
        ("2023-09-26", "2023-09-28"),
        ("2023-10-03", "2023-10-05"),
        ("2023-10-10", "2023-10-12"),
        ("2023-10-17", "2023-10-19"),
        ("2023-10-24", "2023-10-26"),
        ("2023-10-31", "2023-11-02"),
        ("2023-11-07", "2023-11-09"),
        ("2023-11-14", "2023-11-16"),
        ("2023-11-28", "2023-11-30"),  # skip thanksgiving week
    ]

    df = pd.read_csv("attendance_new.csv")
    df = df[df["Teacher Name"] == "Seewoo Lee"]
    for sec in [101, 103]:
        df_sec = df[df["Section Name"] == f"MATH 10A DIS {sec} (In Person)"]
        students = list(df_sec["Student Name"])
        students = list(set(students))
        students = sorted(students, key=lambda name: name.split()[1])  # sort by middle/last name
        extra_credits = {}
        for i, std in enumerate(students):
            df_std = df_sec[df_sec["Student Name"] == std]
            score = 0.0
            df_attend = df_std[df_std["Attendance"] == "present"]
            dates = list(df_attend["Class Date"])
            for week in weeks:
                if (week[0] in dates) and (week[1] in dates):
                    score += 0.375
                    if score >= 3.0:
                        break
            extra_credits[i] = [std, score]
        df_extra_credits = pd.DataFrame.from_dict(extra_credits, orient="index", columns=["Name", "Extra Credit"])
        df_extra_credits.to_excel(f"attendance_dis{sec}.xlsx")
