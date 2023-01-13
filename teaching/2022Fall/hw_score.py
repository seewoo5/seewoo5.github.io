import pandas as pd


def avg_except_mins(scores):
    scores = sorted(scores)
    avg = scores[2:]
    avg = sum(avg) / len(avg)
    return avg


if __name__ == "__main__":
    filename = "dis108.csv"
    df = pd.read_csv(filename)
    df = df.drop([0])
    hw_columns = [c for c in df.columns if "Homework" in c]
    hw_columns = ["Student", "SIS User ID"] + hw_columns[:-3]
    df = df.filter(items=hw_columns)

    new_df = {}
    for i in range(len(df)):
        row = df.iloc[i]
        name, sid, scores = row[0], row[1], row[2:]
        if pd.isna(sid):
            continue
        avg = avg_except_mins(scores) * (15 / 5)
        new_df[i] = [name, int(sid), avg]
    new_df = pd.DataFrame.from_dict(new_df, orient="index", columns=["Name", "SID", "Homework"])
    print(new_df)
    new_df.to_excel(filename + ".xlsx")
