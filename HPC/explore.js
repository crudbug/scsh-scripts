/*
 *  ---------
 * |.##> <##.|  Open Smart Card Development Platform (www.openscdp.org)
 * |#       #|
 * |#       #|  Copyright (c) 1999-2006 CardContact Software & System Consulting
 * |'##> <##'|  Andreas Schwier, 32429 Minden, Germany (www.cardcontact.de)
 *  ---------
 *
 *  This file is part of OpenSCDP.
 *
 *  OpenSCDP is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License version 2 as
 *  published by the Free Software Foundation.
 *
 *  OpenSCDP is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with OpenSCDP; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 *  HPC explorer
 */


load("tools/CardOutlineFactory2.0.js");
load("tools/p15classes.js");

// Create crypto object
var crypto = new Crypto();

// Create application factory that holds all application profiles
var af = new ApplicationFactory(crypto);

// Add ec-card application profiles
af.addApplicationProfile("ap_mf.xml");
af.addApplicationProfile("ap_hpa.xml");
af.addApplicationProfile("ap_qes.xml");
af.addApplicationProfile("ap_esign.xml");
af.addApplicationProfile("ap_cia.xml");
af.addApplicationProfile("ap_auto.xml");

// Create ec-card card object
var card = new Card(_scsh3.reader, "cp_hpc.xml");

// Create card outline factory
var of = new CardOutlineFactory();

// Create list of AIDs, just in case the EF.DIR is empty
// This is just temporary to make sure the explorer works
// even for card with a defect in EF.DIR

var aidlist = new Array();

/* Enable if EF.DIR invalid
aidlist.push(new ByteString("D27600004002", HEX));
aidlist.push(new ByteString("D27600006601", HEX));
aidlist.push(new ByteString("A000000167455349474E", HEX));
aidlist.push(new ByteString("E828BD080FA000000167455349474E", HEX));
*/

// and go...
try     {
        var hpc = new OutlineCard(of, card, af, aidlist);
        hpc.view.show();
}

catch(e) {
        print("No card in reader or problem with reset: " + e);
}
