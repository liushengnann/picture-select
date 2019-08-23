import React from 'react';

const PictresSelect = ({ pictures, value, onChange }) => {
    const [checkedAll, setCheckedAll] = React.useState(false)
    const handleChange = (event, id) => {
        const target = event.target;
        const isChecked = target.type === 'checkbox' ? target.checked : target.value;
        if (isChecked) {
            const newArr = [...value, id]
            onChange(newArr);
            // 全部选中自动激活全选
            if (newArr.length === pictures.length) {
                setCheckedAll(true)
            }
        } else {
            onChange(value.filter(t => t !== id))
            setCheckedAll(false)
        }
    }

    const handleAll = (event) => {
        const target = event.target;
        const isCheckedAll = target.type === 'checkbox' ? target.checked : target.value;
        if (isCheckedAll) {
            onChange(pictures.map(t => t.id));
            setCheckedAll(true);
        } else {
            onChange([]);
            setCheckedAll(false);
        }
    }

    const content = pictures.map(({ id, url }) => {
        return (
            <div style={{ position: 'relative', display: 'inline-block' }} key={id}>
                <input
                    type="checkbox"
                    style={{ position: 'absolute' }}
                    checked={value.includes(id)}
                    onChange={(e) => {
                        handleChange(e, id)
                    }}
                />
                < img src={url} />
            </div>
        )
    })

    return (
        <div>
            <p><input type="checkbox" onChange={handleAll} checked={checkedAll} />已选中{value.length}文件</p >
            {content}
        </div>
    )
}

export default PictresSelect;