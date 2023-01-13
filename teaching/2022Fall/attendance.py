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
        ("2022-08-29", "2022-08-31", "2022-09-02"),
        ("2022-09-12", "2022-09-14", "2022-09-16"),
        ("2022-09-19", "2022-09-21", "2022-09-23"),
        ("2022-09-26", "2022-09-28", "2022-09-30"),
        ("2022-10-03", "2022-10-05", "2022-10-07"),
        ("2022-10-10", "2022-10-12", "2022-10-14"),
        ("2022-10-17", "2022-10-19", "2022-10-21"),
        ("2022-10-24", "2022-10-26", "2022-10-28"),
        ("2022-10-31", "2022-11-02", "2022-11-04"),
    ]

    df = pd.read_csv("attendance_new.csv")
    df = df[df["Teacher Name"] == "Seewoo Lee"]
    for sec in [102, 108]:
        df_sec = df[df["Section Name"] == f"MATH 53 DIS {sec} (In Person)"]
        students = list(df_sec["Student Name"])
        students = list(set(students))
        extra_credits = {}
        for i, std in enumerate(students):
            df_std = df_sec[df_sec["Student Name"] == std]
            score = 0.0
            df_attend = df_std[df_std["Attendance"] == "present"]
            dates = list(df_attend["Class Date"])
            for week in weeks:
                if (week[0] in dates) and (week[1] in dates) and (week[2] in dates):
                    score += 0.5
                    if score >= 3.0:
                        break
            extra_credits[i] = [std, score]
        df_extra_credits = pd.DataFrame.from_dict(extra_credits, orient="index", columns=["Name", "Extra Credit"])
        df_extra_credits.to_excel(f"attendance_dis{sec}.xlsx")
