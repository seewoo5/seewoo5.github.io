import pandas as pd


def avg_except_mins(scores):
    scores = sorted(scores)
    avg = scores[3:]  # exclude lowest three
    avg = sum(avg) / len(avg)
    return avg


if __name__ == "__main__":
    filename = "dis103.csv"
    df = pd.read_csv(filename)
    df = df.drop([0])
    hw_columns = [c for c in df.columns if "Homework" in c]
    hw_columns = ["Student", "SIS User ID"] + hw_columns
    print(hw_columns)
    df = df.filter(items=hw_columns)

    new_df = {}
    for i in range(len(df)):
        row = df.iloc[i]
        name, sid, scores = row[0], row[1], row[2:]
        if pd.isna(sid):
            continue
        avg = avg_except_mins(scores) * (20 / 5)  # HW = 20%
        new_df[i] = [name, int(sid), avg]
    new_df = pd.DataFrame.from_dict(new_df, orient="index", columns=["Name", "SID", "Homework"])
    print(new_df)
    new_df.to_excel(filename[:-4] + ".xlsx")
