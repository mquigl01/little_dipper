module.exports = ({ first_name, last_name, email, phone, ticket_number, po_box, address_line_one, address_line_two, postal_code, province, city, country}, liscence_number) => {
    return `
            <div class="ticket-info">
                <div class="address-line"><p class="address-text">${first_name} ${last_name}</p></div>
                <div class="address-line"><p class="address-text">P.O. Box ${po_box}</p></div>
                <div class="address-line"><p class="address-text">${address_line_one}, ${address_line_two}</p></div>
                <div class="address-line"><p class="address-text">${city}, ${province}</p></div>
                <div class="address-line"><p class="address-text">${postal_code}, ${country}</p></div><br/>

                <div class="double-input-liscence">
                    <p class="text-inline-liscence" style="float: left; margin-top: 6px;">${liscence_number}</p>
                    <p class="text-inline-number" style="float: right; margin-left: 140px; margin-top: 2px;">${ticket_number}</p>
                </div>

                <div style="padding: 0px; margin-top: 40px; margin-bottom: 1px;">
                    <div class="input-line"><p class="text">${first_name} ${last_name}</p></div>
                    <div class="input-line"><p class="text">${email}</p></div>
                    <div class="input-line"><p class="text">${phone}</p></div>
                    <div class="input-line"><p class="text">${address_line_one}</p></div>
                    <div class="input-line"><p class="text">${address_line_two}</p></div>
                    <div class="double-input">
                        <p class="text-inline" style="width: 160px;">${po_box}</p>
                        <p class="text-inline" style="width: 200px;">${province}</p>
                    </div>
                    <div class="double-input">
                        <p class="text-inline" style="width: 250px; margin-left: -205px">${city}</p>
                        <p class="text-inline" style="margin-left: -75px; width: 200px;">${postal_code}</p>
                    </div>
                    <div class="input-line"><p class="text">${ticket_number}</p></div>
                    <div class="input-line"><p class="text" style="font-size: 14px; width: 300px; float: right; margin-top: -30px; margin-right: -45px;">${liscence_number}</p></div>
                </div>
            </div>
    `;
};